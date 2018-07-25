import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: "page-secretary",
  templateUrl: "secretary.html"
})
export class SecretaryPage {

  protected secretary_department: string;

  constructor() { }

  ionViewDidLoad() {
    this.secretary_department = "economy";
  }
}
