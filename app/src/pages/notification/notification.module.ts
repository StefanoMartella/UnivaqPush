import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from "@ngx-translate/core";

import { NotificationPage } from './notification';

@NgModule({
  declarations: [NotificationPage],
  imports: [
    IonicPageModule.forChild(NotificationPage),
    TranslateModule.forChild()
  ]
})
export class NotificationPageModule {}
