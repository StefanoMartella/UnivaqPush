import './shared/rxjs-operators';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { OneSignal } from '@ionic-native/onesignal';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Network } from "@ionic-native/network";
import { SocialSharing } from "@ionic-native/social-sharing";
import { SuperTabsController } from "ionic2-super-tabs";

import { httpInterceptorProviders } from "../interceptors";
import { TaxService } from "../services/tax.service";
import { InsegnamentoService } from "../services/insegnamento.service";
import { EsameService } from "../services/esame.service";
import { LanguageService } from "../services/language.service";
import { NewsService } from "../services/news.service";
import { UtenteService } from "../services/utente.service";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// To translate app before showing view to the user.
// This is made to avoid an annoying effect when app is opened:
// for some milliseconds the translate keys are shown before
// they are translated. This is a way to solve that problem.
export function appInitializerFactory(translate: TranslateService,
                                      languageService: LanguageService) {
  return () =>
    new Promise<any>((resolve: any) => {
      languageService.getActualLanguage().subscribe((language: string) => {
        if (language != null) {
          translate.setDefaultLang(language);
          translate.use(language).subscribe(() => {
            resolve(null);
          });
        }
        else {
          let preferredLanguage = languageService.getPreferredLanguage();
          languageService.updateLanguage(preferredLanguage);
          translate.setDefaultLang(preferredLanguage);
          translate.use(preferredLanguage).subscribe(() => {
            resolve(null);
          });
        }
      });
    });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    SQLite,
    LanguageService,
    UtenteService,
    Network,
    NewsService,
    httpInterceptorProviders,
    InsegnamentoService,
    TaxService,
    EsameService,
    SocialSharing,
    SuperTabsController,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, LanguageService],
      multi: true
    },
    { 
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    }
  ]
})

export class AppModule {}
