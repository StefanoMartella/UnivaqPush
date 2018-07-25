import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Appello, TIPOLOGIE_ESAMI } from "../../model/appello.model";
import { InsegnamentoService } from "../../services/insegnamento.service";

@IonicPage()
@Component({
  selector: 'page-appeal',
  templateUrl: 'appeal.html',
})
export class AppealPage {

  private appello: Appello;
  private inserimento: boolean = false;
  protected dateRequired: boolean = false;
  protected descriptionRequired: boolean = false;
  protected disabledOnOpen: boolean = true;
  protected tipologieEsame = TIPOLOGIE_ESAMI;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private insegnamentoService: InsegnamentoService) {
  }

  ionViewDidLoad() {
    this.appello = this.navParams.get("appello");
    this.inserimento = this.navParams.get("inserimento");
  }

  closeModal() {
    this.navCtrl.pop();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Create new appeal
      if (this.inserimento) {
        this.insegnamentoService.createAppello(this.appello).subscribe(() => {
          this.navCtrl.pop();
        });
      } 
      else {
        // Update existing appeal
        this.insegnamentoService.updateAppello(this.appello).subscribe(() => {
          this.navCtrl.pop();
        });
      }

    }
  }

}
