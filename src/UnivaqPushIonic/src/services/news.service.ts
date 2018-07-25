import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { OneSignal } from '@ionic-native/onesignal';

import { News } from "../model/news.model";
import { NEWS_ON, NEWS_OFF, MAX_NEWS_NUMBER } from '../constants';

@Injectable()
export class NewsService {

  private db: SQLiteObject;

  constructor(
    private storage: Storage,
    private sqlite: SQLite,
    private oneSignal: OneSignal
  ) { }

  // Retrive status of news(enabled or disabled) 
  // for the given section
  getSectionNewsStatus(section: string) {
    return this.storage.get(section).then((status_news_db) => {
      return status_news_db == NEWS_ON ? true : false;
    });
  }
 
  // Set status of news(enabled or disabled) 
  // for the given section
  setNews(section: string, new_value: boolean) {
    if (new_value) {
      this.oneSignal.sendTag(section, NEWS_ON);
      this.storage.set(section, NEWS_ON);
    }
    else {
      this.oneSignal.sendTag(section, NEWS_OFF);
      this.storage.set(section, NEWS_OFF);
    }
  }

  //Retrieve all news from database
  getAllNewsFromDB(): Promise<News[]> {

    let allNews: Array<News> = new Array<News>();

    return this.sqlite
      .create({
        name: "OneSignal.db",
        location: "default"
      })
      .then(db => {
        this.db = db;
      })
      .then(() => {
        return this.db.executeSql("SELECT COUNT(*) FROM notification", []);
      })
      .then(data => {
        let number_of_rows = data.rows.item(0)["COUNT(*)"];
        if (number_of_rows > MAX_NEWS_NUMBER) {
          let query =
            "DELETE FROM notification WHERE _id IN" +
            "(SELECT _id FROM notification ORDER BY _id LIMIT " +
            (number_of_rows - MAX_NEWS_NUMBER) + ")";
          this.db.executeSql(query, []);
        }
      })
      .then(() => {
        return this.db.executeSql(
          "SELECT * FROM notification ORDER BY _id DESC",
          []
        );
      })
      .then(raw_news => { this.fillNews(raw_news, allNews); })
      .then(() => { return allNews });
  }

  // Refresh news
  refreshNewsFromDB(): Promise<News[]> {
   
    let allNews: Array<News> = new Array<News>();

    return this.db.executeSql("SELECT * FROM notification ORDER BY _id DESC", [])
      .then(raw_news => { this.fillNews(raw_news, allNews); })
      .then(() => { return allNews });
  }

  // Remove news from database
  removeNewsFromDB(news_id): void {
    this.db.executeSql(
      "DELETE FROM notification WHERE notification_id=(?)",
      [news_id]
    );
  }

  fillNews(raw_news: any, allNews: Array<News>): void {
    for (let i = 0; i < raw_news.rows.length; i++) {

      let additionalData = this.cleanJSON(raw_news.rows.item(i).full_data);

      let currentNews = new News(
        raw_news.rows.item(i).notification_id,
        raw_news.rows.item(i).title,
        raw_news.rows.item(i).message,
        additionalData.custom.a.link,
        additionalData.custom.a.section,
        additionalData.custom.a.date
      );
      allNews.push(currentNews);
    }
  }

  // Function to clean JSON
  cleanJSON(raw_JSON: string): any {
    return JSON.parse(
      raw_JSON.replace(/\\/g, "")
        .replace(/:"{/g, ":{")
        .replace(/}"/, "}")
    );
  }

}
