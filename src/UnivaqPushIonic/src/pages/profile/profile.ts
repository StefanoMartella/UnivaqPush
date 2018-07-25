import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NgForm } from "@angular/forms";

import { Utente } from "../../model/utente.model";
import { UtenteService } from "../../services/utente.service";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  private utente: Utente;

  constructor(
    private navCtrl: NavController,
    private utenteService: UtenteService
  ) { }

  ionViewDidLoad() {
    this.utenteService.getUtente().subscribe((utente: Utente) => {
      this.utente = utente;
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.utenteService
        .updateProfilo(this.utente)
        .subscribe((nuovoUtente: Utente) => {
          this.utente = nuovoUtente;
          this.navCtrl.pop();
        });
    }
  }
}
