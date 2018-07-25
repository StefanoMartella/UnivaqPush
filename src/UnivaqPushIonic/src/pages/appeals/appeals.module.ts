import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from "@ngx-translate/core";

import { AppealsPage } from './appeals';

@NgModule({
  declarations: [
    AppealsPage,
  ],
  imports: [
    IonicPageModule.forChild(AppealsPage),
    TranslateModule.forChild()
  ],
})
export class AppealsPageModule {}
