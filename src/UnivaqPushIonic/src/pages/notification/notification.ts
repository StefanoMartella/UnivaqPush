import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NewsService } from '../../services/news.service';
import { Network } from "@ionic-native/network";

@IonicPage()
@Component({
  selector: "page-notification",
  templateUrl: "notification.html"
})
export class NotificationPage {
  // Listener on network state
  private networkStatus: any;

  // If there is not connection the toggles are
  // disabled because OneSignal communication is not possible
  private isDisabled: boolean;

  // Map of all available sections
  // The name is displayed on the template,
  // news_enables indicates if the are activated(checked) or not
  private sections = {
    univaq_news: {
      section_name: "Univaq",
      news_enabled: false
    },
    disim_news: {
      section_name: "Disim",
      news_enabled: false
    }
  };

  constructor(
    private navCtrl: NavController,
    private network: Network,
    private newsService: NewsService
  ) {
    network.type == "none" ? (this.isDisabled = true) : (this.isDisabled = false);
  }

  ionViewDidLoad() {
    // Subscription on network's status change
    this.subscribeToEvents();
    // Setting toggles status(checked or not) according to DB status
    this.initToggles();
  }

  ionViewDidLeave() {
    this.networkStatus.unsubscribe();
  }

  subscribeToEvents(){
    this.networkStatus = this.network.onchange().subscribe(() => {
      this.navCtrl.pop();
    });
  }

  initToggles() {
    for (let section in this.sections) {
      this.newsService
        .getSectionNewsStatus(section)
        .then((status_news: boolean) => {
          this.sections[section].news_enabled = status_news;
        });
    }
  }

  setSectionNews(section, new_value) {
    this.newsService.setNews(section, new_value);
  }

  // To loop over sections variable's keys on the template
  sectionsKeys(sections) {
    return Object.keys(sections);
  }
}
