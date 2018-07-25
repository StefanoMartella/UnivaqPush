import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from "@ngx-translate/core";

import { AppealPage } from './appeal';

@NgModule({
  declarations: [
    AppealPage,
  ],
  imports: [
    IonicPageModule.forChild(AppealPage),
    TranslateModule.forChild()
  ],
})
export class AppealPageModule {}
