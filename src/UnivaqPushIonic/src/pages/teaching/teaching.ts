import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Utente } from "../../model/utente.model";
import { Insegnamento } from "../../model/insegnamento.model";
import { Esame } from "../../model/esame";
import { UtenteService } from "../../services/utente.service";
import { InsegnamentoService } from "../../services/insegnamento.service";
import { EsameService } from "../../services/esame.service";
import { APPEALS_PAGE, COURSE_DETAIL_PAGE } from "../pages";

@IonicPage()
@Component({
  selector: "page-teaching",
  templateUrl: "teaching.html"
})
export class TeachingPage {
  private insegnamenti: Array<Insegnamento> = new Array<Insegnamento>();
  protected utente: Utente;

  constructor(
    private navCtrl: NavController,
    private utenteService: UtenteService,
    private esameService: EsameService,
    private insegnamentoService: InsegnamentoService
  ) { }

  ionViewDidLoad() {
    this.subscribeToEvents();
  }

  subscribeToEvents(){
    this.utenteService.getUtente().subscribe((utente: Utente) => {
      this.utente = utente;

      // Retrieving all courses taught by this user if he's a teacher
      if (utente.ruolo == "docente") {
        this.insegnamentoService
          .listInsegnamenti()
          .subscribe((insegnamenti: Array<Insegnamento>) => {
            this.insegnamenti = insegnamenti;
          });
      }
      // Retrieving all courses attended and not yet passed
      // by this user if he's a student
      else {
        this.esameService
          .list()
          .subscribe((courses: Array<Esame>) => {
            for (let course of courses) {
              if (course.statoEsame != "SUPERATO")
                this.insegnamenti.push(course.insegnamento);
            }
          });
      }
    });
  }

  openAppelli(idInsegnamento: number) {
    this.navCtrl.push(APPEALS_PAGE, { idInsegnamento: idInsegnamento });
  }

  openDettaglioInsegnamento(course: Insegnamento) {
    this.navCtrl.push(COURSE_DETAIL_PAGE, { course: course });
  }
}
