import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Esame } from '../../model/esame';
import { EsameService } from '../../services/esame.service';

@IonicPage()
@Component({
  selector: 'page-booklet',
  templateUrl: 'booklet.html',
})
export class BookletPage {

  protected personal_courses: any;

  constructor(private EsameService: EsameService) { }

  ionViewDidLoad() {
    this.EsameService.list().subscribe((data: Array<Esame>) => {
      this.personal_courses = data;
    });
  }

}
