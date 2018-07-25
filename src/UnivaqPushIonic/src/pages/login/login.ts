import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { AlertController, Events, IonicPage, NavController } from "ionic-angular";

import { Utente } from "../../model/utente.model";
import { Account, UtenteService } from "../../services/utente.service";
import { UNAUTHORIZED_ERROR } from "../../constants";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {

  // Account infos(stored into the DB when the user logs)
  private account: Account = {
     username: "", 
     password: ""
  };

  // Event listener
  private languageChanged: any;

  // Buttons and alerts translation
  private loginTitle: string;
  private loginSubTitle: string;
  protected usernameRequired: boolean = false;
  protected passwordRequired: boolean = false;

  constructor(
    private events: Events,
    private nav: NavController,
    private alertCtrl: AlertController,
    private utenteService: UtenteService,
    private translateService: TranslateService
  ) { }

  ionViewDidLoad() {
    this.subscribeToEvents();
    this.getTranslation();
  }

  ionViewDidLeave(){
    this.languageChanged.unsubscribe();
  }

  subscribeToEvents() {
    // To automatically fill username and password fields with 
      // values inserted from the user when he logged last time
    this.utenteService.getAccount().subscribe(account => {
      if (account != null) {
        this.account.username = account.username;
        this.account.password = account.password;
      }
    });

    // When the language changes the errors and 
    // warnings need to be translated again
    this.languageChanged = this.translateService.onLangChange.subscribe(() => {
        this.getTranslation();
      }
    );
  }

  getTranslation(){
    this.translateService.get("LOGIN_ERROR_TITLE").subscribe(data => {
      this.loginTitle = data;
    });
    this.translateService.get("LOGIN_ERROR_SUB_TITLE").subscribe(data => {
      this.loginSubTitle = data;
    });
  }

  onLogin(form: NgForm) {
    if (form.valid) {
      this.utenteService.login(this.account).subscribe(
        (utente: Utente) => {
          // This event is caught from app.ts
          // to log the current user
          this.events.publish("login", utente);
          this.nav.pop();
        },
        (err: HttpErrorResponse) => {
          if (err.status == UNAUTHORIZED_ERROR) {
            this.showLoginError();
          }
        }
      );
    }
  }

  showLoginError() {
    let alert = this.alertCtrl.create({
      title: this.loginTitle,
      subTitle: this.loginSubTitle,
      buttons: ["OK"]
    });
    alert.present();
  }

}
