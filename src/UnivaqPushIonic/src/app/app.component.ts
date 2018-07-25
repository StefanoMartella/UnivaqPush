import { HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController, MenuController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import { TranslateService } from "@ngx-translate/core";
import { 
  DETAILS_PAGE, 
  NOTIFICATION_PAGE, 
  LOGIN_PAGE, 
  PROFILE_PAGE, 
  TEACHING_PAGE, 
  TAX_PAGE,
  BOOKLET_PAGE,
  TABS_PAGE,
  LANGUAGE_PAGE} from '../pages/pages';

import { News } from "../model/news.model";
import { Utente } from "../model/utente.model";
import { UtenteService } from "../services/utente.service";
import { APP_ID, GOOGLE_PROJECT_NUMBER, UNAUTHORIZED_ERROR, FORBIDDEN_ERROR } from '../constants';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) private nav: Nav;

  protected utente: Utente;
  protected isLogged: boolean = false;
  
  protected rootPage: any = "TabsPage";

  // Event listener
  private languageChanged: any;

  // Errors and warnings translation
  private error: string;
  private serverError: string;
  private userNotAuthorizedError: string;
  private userNotAuthenticatedError: string;

  // Menu for unlogged users, also used for logged users
  defaultMenu: any[] = [
    { title: "NOTIFICATIONS", component: NOTIFICATION_PAGE, icon: "notifications" },
    { title: "LANGUAGE", component: LANGUAGE_PAGE, icon: "flag" }
  ];

  menuStudenti: any[] = [
    { title: "PROFILE", component: PROFILE_PAGE, icon: "contact" },
    { title: "TASSE_MENU", component: TAX_PAGE, icon: "cash" },
    { title: "LIBRETTO_MENU", component: BOOKLET_PAGE, icon: "ios-bookmarks" },
    { title: "APPEALS", component: TEACHING_PAGE, icon: "school" }
  ].concat(this.defaultMenu);

  menuDocenti: any[] = [
    { title: "PROFILE", component: PROFILE_PAGE, icon: "contact" },
    { title: "TEACHINGS", component: TEACHING_PAGE, icon: "ios-bookmarks" }
  ].concat(this.defaultMenu);

  constructor(
    private platform: Platform,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    private utenteService: UtenteService,
    private menu: MenuController,
    private events: Events,
    private translateService: TranslateService,
    private splashScreen: SplashScreen
  ) {
    // For debug purpose:
    // Cannot initializate OneSignal 
    // on non physical device
    if (this.platform.is("cordova")) {
      this.initOneSignal();
    }
    // Translation in ionViewDidLoad
    // doesn't work in this component
    this.getTranslation();
    this.subscribeToEvents();
    this.splashScreen.hide();
   }

  ionViewDidLeave() {
    this.languageChanged.unsubscribe();
  }

  // Getting errors and warnings translation
  getTranslation() {
    this.translateService.get("ERROR").subscribe((error: string) => {
      this.error = error;
    });
    this.translateService.get("SERVER_ERROR").subscribe((error: string) => {
      this.serverError = error;
    });
    this.translateService.get("NOT_AUTHORIZED").subscribe((error: string) => {
      this.userNotAuthorizedError = error;
    });
    this.translateService.get("NOT_AUTHENTICATED").subscribe((error: string) => {
      this.userNotAuthenticatedError = error;
    });
  }

  subscribeToEvents() {
    // Waiting for login event
    this.events.subscribe("login", (utente: Utente) => {
      this.utente = utente;
      this.isLogged = true;
      // To open the menu after login
      this.menu.open();
    });

    this.events.subscribe("server-error", (error: HttpErrorResponse) => {
      this.showMessageServerError(error);
    });

    // When the language is changed all the translated
    // variables need to be translated again
    this.languageChanged = this.translateService.onLangChange.subscribe(() => {
      this.getTranslation();
    });
  }

  initOneSignal() {
    // OneSignal initialization
    this.oneSignal.startInit(APP_ID, GOOGLE_PROJECT_NUMBER);

    // When a notification is received when the app is in 
    // foreground the behaviour is standard(notification on status bar)
    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.Notification
    );

    // Tap on notification behaviour(open details page)
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      let news = new News(
        data.notification.androidNotificationId,
        data.notification.payload.title,
        data.notification.payload.body,
        data.notification.payload.additionalData.link,
        data.notification.payload.additionalData.section,
        data.notification.payload.additionalData.date
      );
      this.nav.push(DETAILS_PAGE, news);
    });

    // OneSignal initialization ending
    this.oneSignal.endInit();
  }

  showMessageServerError(err: HttpErrorResponse) {
    let errorMessage = this.serverError;

    switch (err.status) {
      case UNAUTHORIZED_ERROR:
        errorMessage = this.userNotAuthorizedError;
        break;
      case FORBIDDEN_ERROR:
        errorMessage = this.userNotAuthenticatedError;
        break;
      default:
        errorMessage = this.error + ": " + err.status;
    }
    let alert = this.alertCtrl.create({
      title: this.error,
      subTitle: errorMessage,
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.utenteService.logout();
            this.nav.setRoot(TABS_PAGE);
          }
        }
      ]
    });
    alert.present();
  }

  logout() {
    this.utenteService.logout();
    this.isLogged = false;
    this.nav.popToRoot();
  }

  openPage(item) {
    this.nav.push(item.component);
  }

  openLoginPage() {
    this.nav.push(LOGIN_PAGE);
  }

}
