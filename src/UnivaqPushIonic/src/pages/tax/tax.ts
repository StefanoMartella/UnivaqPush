import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { Tax } from "../../model/tax.model";
import { TaxService } from '../../services/tax.service';

@IonicPage()
@Component({
  selector: "page-tax",
  templateUrl: "tax.html"
})
export class TaxPage {

  protected taxes: any;

  constructor(private taxService: TaxService) { }

  ionViewDidLoad() {
    this.taxService.list().subscribe((taxes: Array<Tax>) => {
      this.taxes = taxes;
    });
  }
}
