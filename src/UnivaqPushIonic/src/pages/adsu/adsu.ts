import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: "page-adsu",
  templateUrl: "adsu.html"
})
export class AdsuPage {
  protected time_phone: string;
  protected seat: string;

  constructor(){}

  ionViewDidLoad() {
    this.time_phone = "front-office";
    this.seat = "registered_office";
  }
}
