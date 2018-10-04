import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { OneSignal } from "@ionic-native/onesignal";
import { Platform } from "ionic-angular";

import { News } from "../model/news.model";
import { ENV } from "@app/env";

@Injectable()
export class NewsService {
  private db: SQLiteObject;
  // To check if the database is ready
  private ready: Promise<void>;

  constructor(
    private storage: Storage,
    private sqlite: SQLite,
    private oneSignal: OneSignal,
    private platform: Platform
  ) {
    this.setDatabase();
  }

  setDatabase(): void {
    // Creates database if it not exists
    // and get the connector
    if (this.platform.is("cordova")) {
      this.ready = this.sqlite
        .create({ name: "univaqpush.db", location: "default" })
        .then(db => { 
          this.db = db; 
          this.db.executeSql(
            "CREATE TABLE IF NOT EXISTS notification ( " +
            "_id INTEGER PRIMARY KEY, " +
            "title TEXT, " +
            "body TEXT, " +
            "link TEXT, " +
            "section TEXT, " +
            "date TEXT);", []
          );
        });
    }
  }

  // Retrieves all news from database
  getAllNewsFromDB(): Promise<News[]> {
    let allNews: Array<News> = new Array<News>();

    return this.ready.then(() => {
      // Removing news exceeding MAX_NEWS_NUMBER value
      return this.removeOldNewsFromDB().then(() => {
        // Retrieving all news from db
        return this.db.executeSql("SELECT * FROM notification ORDER BY _id DESC", [])
          .then(raw_news => {
            // Filling allNews variable with retrieved news
            this.fillNews(raw_news, allNews);
            return allNews;
          });
      });
    });
  }

  // Remove news if they are more than MAX_NEWS_NUMBER
  removeOldNewsFromDB(): Promise<void> {
    return this.db.executeSql("SELECT COUNT(*) FROM notification", []).then(data => {
      let number_of_rows = data.rows.item(0)["COUNT(*)"];
      //console.log("Rows: " + number_of_rows);
      if (number_of_rows > ENV.MAX_NEWS_NUMBER) {
        let query =
          "DELETE FROM notification WHERE _id IN " +
          "(SELECT _id FROM notification ORDER BY _id ASC LIMIT " +
          (number_of_rows - ENV.MAX_NEWS_NUMBER) +
          ");";
        this.db.executeSql(query, []);
      }
    });
  }

  // Remove a single news from database according to notification_id
  removeNewsFromDB(news_id): void {
    this.db.executeSql("DELETE FROM notification WHERE _id=(?)", [
      news_id
    ]);
  }

  fillNews(current_news: any, allNews: Array<News>): void {
    for (let i = 0; i < current_news.rows.length; i++) {

      let currentNews = new News(
        current_news.rows.item(i)._id,
        current_news.rows.item(i).title,
        current_news.rows.item(i).body,
        current_news.rows.item(i).link,
        current_news.rows.item(i).section,
        current_news.rows.item(i).date
      );

      allNews.push(currentNews);
    }
  }

  // Retrive status of news(enabled or disabled)
  // for the given section
  getSectionNewsStatus(section: string): Promise<boolean> {
    return this.storage.get(section).then(status_news_db => {
      return status_news_db === ENV.NEWS_ON ? true : false;
    });
  }

  // Set status of news(enabled or disabled)
  // for the given section
  setNews(section: string, new_value: boolean): void {
    if (new_value) {
      this.oneSignal.sendTag(section, ENV.NEWS_ON);
      this.storage.set(section, ENV.NEWS_ON);
    } else {
      this.oneSignal.sendTag(section, ENV.NEWS_OFF);
      this.storage.set(section, ENV.NEWS_OFF);
    }
  }

}
