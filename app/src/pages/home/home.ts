import { Component } from '@angular/core';
import { SocialSharing } from "@ionic-native/social-sharing";
import { TranslateService } from "@ngx-translate/core";
import {
  Platform,
  ItemSliding,
  IonicPage,
  App,
  Events,
  AlertController
} from "ionic-angular";

import { News } from '../../model/news.model';
import { NewsService } from "../../services/news.service";
import { DETAILS_PAGE } from '../pages';

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  // Buttons and alerts translation
  private warning: string;
  private deleteWarning: string;
  private yesButton: string;
  private noButton: string;

  // Events listeners
  private closeSearch: any;
  private researchWaiter: any;
  private languageChanged: any;

  // Array used on the template
  // This may contains only filtered news
  private allNews: Array<News> = new Array<News>();

  // Support list usuful when there is a research in progress
  // This always contains all news stored into the DB
  private allNewsFixed: Array<News> = new Array<News>();

  constructor(
    private platform: Platform,
    private newsService: NewsService,
    private alertCtrl: AlertController,
    private appCtrl: App,
    private events: Events,
    private translateService: TranslateService,
    private socialSharing: SocialSharing
  ) {}

  ionViewDidLoad() {
    // Loading translations
    this.getTranslation();

    // Retrieving news from DB when this page is loaded for the first time
    if (this.platform.is("cordova")) {
      this.newsService.getAllNewsFromDB().then((allNewsFromDB: Array<News>) => {
        this.allNews = allNewsFromDB.slice();
        this.allNewsFixed = allNewsFromDB.slice();
      });
    }
  }

  ionViewWillEnter() {
    //  Subscription on news research, searchbar close and
    //  language changed each time the page is the current view.
    this.subscribeToEvents();
  }

  ionViewDidLeave() {
    //  Unsubscription on news research, searchbar close and
    //  language changed when this is not the current view anymore.
    this.unsubscribeToEvents();
  }

  subscribeToEvents() {
    // When a word is inserted into the searchbar a
    // events.publish("news-research", word) is called from
    // tabs.ts and is intercepted here.
      this.researchWaiter = this.events.subscribe("news-research",(word: string) => {
        this.allNews = this.allNewsFixed.filter((news: News) => {
          return (news.title.toUpperCase().includes(word.toUpperCase()) ||
                  news.body.toUpperCase().includes(word.toUpperCase()))
        });
      }
    );

    // When the searchbar is cleaned
    // events.publish("close-search", word) is called from
    // tabs.ts and is intercepted here.
    this.closeSearch = this.events.subscribe("close-search", () => {
      this.allNews = this.allNewsFixed.slice();
    });

    // When the language is changed all the translated
    // varibles need to be translated again
    this.languageChanged = this.translateService.onLangChange.subscribe(() => {
      this.getTranslation();
    });
  }

  unsubscribeToEvents() {
    this.events.unsubscribe("news-research", this.researchWaiter);
    this.events.unsubscribe("close-search", this.closeSearch);
    this.languageChanged.unsubscribe();
    // To restore news if the user has filtered the news 
    // using the searchbar: when the user changes home view the 
    // closeSearch listener has alreaby been unsubscribed so 
    // when the user comes back to home view he will see news filtered
    // and the searchbar closed, this can be confusing for him
    this.allNews = this.allNewsFixed.slice();
  }

  getTranslation() {
    this.translateService.get("DELETE_NEWS_MESSAGE").subscribe((data: string) => {
      this.deleteWarning = data;
    });
    this.translateService.get("WARNING").subscribe((data: string) => {
      this.warning = data;
    });
    this.translateService.get("YES_BUTTON").subscribe((data: string) => {
      this.yesButton = data;
    });
    this.translateService.get("NO_BUTTON").subscribe((data: string) => {
      this.noButton = data;
    });
  }

  openDetail(news: News) {
    this.appCtrl.getRootNavs()[0].push(DETAILS_PAGE, news);
  }

  // Displays alert when delete button is pressed,
  // this can be avoided callind removeNews function
  // directly from the template(without alert).
  removeNewsAlert(news: News, sliding: ItemSliding) {
    let confirm = this.alertCtrl.create({
      title: this.warning,
      message: this.deleteWarning,
      buttons: [
        {
          text: this.noButton,
          handler: () => { sliding.close(); }
        },
        {
          text: this.yesButton,
          handler: () => {
            this.removeNews(news);
          }
        }
      ]
    });
    confirm.present();
  }

  // Removes deleted news(from template) 
  // from all lists and from DB
  removeNews(news) {
    let index = this.allNews.indexOf(news);
    let indexFixed = this.allNewsFixed.indexOf(news);

    if (index > -1 && indexFixed > -1) {
      this.allNews.splice(index, 1);
      this.allNewsFixed.splice(indexFixed, 1);
      this.newsService.removeNewsFromDB(news.id);
    }
  }

  // Retrieves news from DB when the list of news is refreshed;
  // if the list is refreshed when the news are filtered by the searhbar
  // the fixed list is refreshed, otherwise the displayed list is refresheds
  refreshNews(refresher) {
    setTimeout(() => {
    this.newsService.getAllNewsFromDB().then((allNewsFromDB: Array<News>) => {
        if (this.allNews.length === this.allNewsFixed.length){
          this.allNews = allNewsFromDB.slice();
        }
        this.allNewsFixed = allNewsFromDB.slice();
        refresher.complete();
      })
    }, 200);
  }

  // Share functionalily
  share(news, sliding) {
    let sharableNews = news.sharableVersion();
    this.socialSharing.share(sharableNews)
      .then(() => {
        sliding.close();
      })
      .catch(() => {
        // Error!
      });
  }
}
