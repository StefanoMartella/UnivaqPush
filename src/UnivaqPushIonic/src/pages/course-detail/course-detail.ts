import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { Insegnamento } from '../../model/insegnamento.model';

@IonicPage()
@Component({
  selector: 'page-course-detail',
  templateUrl: 'course-detail.html',
})
export class CourseDetailPage {

  protected course: Insegnamento;

  constructor(private params: NavParams) {
    this.course = this.params.data.course;
  }

}
