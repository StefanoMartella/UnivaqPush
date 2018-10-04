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
  // news_enables indicates if they are activated(checked) or not
  private sections = {
    "Univaq" : {
      subsections : {
        univaq_news: {
          section_name: "Univaq",
          news_enabled: false
        }
      },
      color : "dark_univaq"
    },
    "DISIM" : {
      subsections : {
        disim_news: {
          section_name: "Disim",
          news_enabled: false
        }
      },
      color: "disim"
    },
    "MESVA" : {
      subsections : {
        mesva_general: {
          section_name: "In Evidenza",
          news_enabled: false
        },
        mesva_medical: {
          section_name: "Area Medicina",
          news_enabled: false
        },
        mesva_environmental_science: {
          section_name: "Scienze Ambientali",
          news_enabled: false
        },
        mesva_biological_science: {
          section_name: "Scienze Biologiche",
          news_enabled: false
        }
      },
      color: "limegreen"
    },
    "DISCAB" : {
      subsections: {
        discab_general: {
          section_name: "Dipartimento",
          news_enabled: false
        },
        discab_biotechnology: {
          section_name: "Biotecnologie",
          news_enabled: false
        },
        discab_medical: {
          section_name: "Area Medica",
          news_enabled: false
        },
        discab_motor_science: {
          section_name: "Scienze Motorie",
          news_enabled: false
        },
        discab_psychology: {
          section_name: "Psicologia",
          news_enabled: false
        }
      },
      color: "primary"
    },
    "DSFC" : {
      subsections: {
        dsfc_news: {
          section_name: "News",
          news_enabled: false
        },
        dsfc_inevidenza: {
          section_name: "In Evidenza",
          news_enabled: false
        },
        dsfc_chemistry_and_physics: {
          section_name: "Chimica - Fisica",
          news_enabled: false
        },
        dsfc_chemistry: {
          section_name: "Chimica",
          news_enabled: false
        },
        dsfc_physics: {
          section_name: "Fisica",
          news_enabled: false
        }
      },
      color: "coral"
    }    
  };

  constructor(
    private navCtrl: NavController,
    private network: Network,
    private newsService: NewsService
  ) {
    console.log('Notification constructor');
    network.type === "none" ? (this.isDisabled = true) : (this.isDisabled = false);
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
    for (const section in this.sections) {
      if (this.sections.hasOwnProperty(section)) {
        for (const subsection in this.sections[section].subsections) {
          if (this.sections[section].subsections.hasOwnProperty(subsection)) {
            this.newsService
              .getSectionNewsStatus(subsection)
              .then((status_news: boolean) => {
                this.sections[section].subsections[subsection].news_enabled = status_news;
              });
          }
        }
      }
    }
  }

  setSectionNews(subsection, new_value) {
    this.newsService.setNews(subsection, new_value);
  }

  // To loop over sections variable's keys on the template
  sectionsKeys(sections) {
    return Object.keys(sections);
  }

}
