import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  AlertController,
  IonicPage,
  ItemSliding,
  ModalController,
  NavParams
} from "ionic-angular";

import { Appello, TIPOLOGIA_ESAME_SCRITTO } from "../../model/appello.model";
import { Utente } from "../../model/utente.model";
import { Insegnamento } from "../../model/insegnamento.model";
import { PrenotazioneAppello } from "../../model/prenotazioneappello.model";
import { UtenteService } from "../../services/utente.service";
import { InsegnamentoService } from "../../services/insegnamento.service";
import { APPEAL_PAGE } from "../pages";

@IonicPage()
@Component({
  selector: "page-appeals",
  templateUrl: "appeals.html"
})
export class AppealsPage {

  // Buttons and alerts translation
  private deleteTitle: string;
  private messageTitle: string;
  private deleteButton: string;
  private cancelButton: string;
  private okButton: string;
  private signText: string;
  private warning: string;
  private deleteSignText: string;

  // Event listener
  private languageChanged: any;

  private idInsegnamento: number;
  protected utente: Utente;
  protected prenotazioneAppelli: Array<PrenotazioneAppello> = new Array<PrenotazioneAppello>();
  protected appelli: Array<Appello> = new Array<Appello>();

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private utenteService: UtenteService,
    private translateService: TranslateService,
    private insegnamentoService: InsegnamentoService
  ) { }

  ionViewDidLoad() {
    this.subscribeToEvents();
    this.getTranslation();
    this.idInsegnamento = this.navParams.get("idInsegnamento");  
  }

  ionViewDidLeave(){
    this.languageChanged.unsubscribe();
  }

  subscribeToEvents() {
    // When the language is changed all the translated
    // varibles need to be translated again
    this.languageChanged = this.translateService.onLangChange.subscribe(() => {
      this.getTranslation();
    });

    // Displays appeals according to users's type(student or teacher)
    this.utenteService.getUtente().subscribe((utente: Utente) => {
      this.utente = utente;
      utente.ruolo == "docente" ? this.listAppelli() : this.listAppelliStudente();
    });
  }

  getTranslation() {
    this.translateService.get("APPELLO_DELETE_TITLE").subscribe((data: string) => {
      this.deleteTitle = data;
    });
    this.translateService.get("APPELLO_DELETE_MESSAGE").subscribe((data: string) => {
      this.messageTitle = data;
    });
    this.translateService.get("DELETE_BUTTON").subscribe((data: string) => {
      this.deleteButton = data;
    });
    this.translateService.get("CANCEL_BUTTON").subscribe((data: string) => {
      this.cancelButton = data;
    });
    this.translateService.get("APPEAL_SIGN_TEXT").subscribe((data: string) => {
      this.signText = data;
    });
    this.translateService.get("APPEAL_DELETE_SIGN_TEXT").subscribe((data: string) => {
      this.deleteSignText = data;
    });
    this.translateService.get("BUTTON_OK").subscribe((data: string) => {
      this.okButton = data;
    });
    this.translateService.get("WARNING").subscribe((data: string) => {
      this.warning = data;
    });
  }

  updateAppello(app: Appello) {
    this.insegnamentoService
      .findAppelloById(app.id)
      .subscribe((appello: Appello) => {
        let modal = this.modalCtrl.create(APPEAL_PAGE, {
          appello: appello,
          inserimento: false
        });
        modal.onDidDismiss(() => {
          this.listAppelli();
        });
        modal.present();
      });
  }

  deleteAppello(app: Appello, sliding: ItemSliding) {
    let confirm = this.alertCtrl.create({
      title: this.deleteTitle,
      message: this.messageTitle,
      buttons: [{
          text: this.cancelButton,
          handler: () => { sliding.close(); }
        },{
          text: this.deleteButton,
          handler: () => {
            this.insegnamentoService.deleteAppello(app).subscribe(() => {
              this.listAppelli();
            });
          }
        }]
    });
    confirm.present();
  }

  gestisciAppello(prenotazioneappello: PrenotazioneAppello, sliding: ItemSliding, newState: string) {
    let confirm = this.alertCtrl.create({
      title: this.warning,
      message: newState == "PRENOTATO" ? this.signText : this.deleteSignText,
      buttons: [{
          text: this.cancelButton,
          handler: () => { sliding.close(); }
        },{
          text: this.okButton,
          handler: () => {
            prenotazioneappello.statoPrenotazione = newState;
            this.insegnamentoService
              .updatePrenotazioneAppello(prenotazioneappello)
              .subscribe(() => {
                sliding.close();
              });
          }
        }]
    });
    confirm.present();
  }

  createAppello() {
    let appello = new Appello();
    appello.tipologiaEsame = TIPOLOGIA_ESAME_SCRITTO;
    appello.insegnamento = new Insegnamento();
    appello.insegnamento.id = this.idInsegnamento;
    let modal = this.modalCtrl.create(APPEAL_PAGE, {
      appello: appello,
      inserimento: true
    });
    modal.onDidDismiss(() => {
      this.listAppelli();
    });
    modal.present();
  }

  listAppelli() {
    this.insegnamentoService
      .listAppelli(this.idInsegnamento)
      .subscribe((app: Array<Appello>) => {
        this.appelli = app;
      });
  }

  listAppelliStudente(){
    this.insegnamentoService
      .listAppelliStudente(this.idInsegnamento)
      .subscribe((prenotations: Array<PrenotazioneAppello>) => {
        this.prenotazioneAppelli = prenotations;
      })
  }

}
