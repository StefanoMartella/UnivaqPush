import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import { DETAILS_PAGE, NOTIFICATION_PAGE, LANGUAGE_PAGE, INFO_PAGE} from '../pages/pages';

import { News } from "../model/news.model";
import { ENV } from "@app/env";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) private nav: Nav;

  protected rootPage: any = "TabsPage";

  protected menu: any[] = [
    { title: "NOTIFICATIONS", component: NOTIFICATION_PAGE, icon: "notifications" },
    { title: "LANGUAGE", component: LANGUAGE_PAGE, icon: "flag" },
    { title: "ABOUT", component: INFO_PAGE, icon: "ios-information-circle" }
  ];

  constructor(
    private platform: Platform,
    private oneSignal: OneSignal,
    private splashScreen: SplashScreen
  ) {
    if (this.platform.is("cordova")) {
      this.initOneSignal();
    }
    this.splashScreen.hide();
  }

  initOneSignal() {
    // OneSignal initialization
    this.oneSignal.startInit(ENV.APP_ID, ENV.GOOGLE_PROJECT_NUMBER);

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

  openPage(item) {
    this.nav.push(item.component);
  }
  
}
