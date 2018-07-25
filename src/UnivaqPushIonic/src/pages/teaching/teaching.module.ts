import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from "@ngx-translate/core";

import { TeachingPage } from './teaching';

@NgModule({
  declarations: [
    TeachingPage,
  ],
  imports: [
    IonicPageModule.forChild(TeachingPage),
    TranslateModule.forChild()
  ],
})
export class TeachingPageModule {}
