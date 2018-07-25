import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from "@ngx-translate/core";

import { CourseDetailPage } from './course-detail';

@NgModule({
  declarations: [
    CourseDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CourseDetailPage),
    TranslateModule.forChild()
  ],
})
export class CourseDetailPageModule {}
