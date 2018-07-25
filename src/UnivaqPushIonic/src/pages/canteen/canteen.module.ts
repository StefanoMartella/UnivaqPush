import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { CanteenPage } from './canteen';

@NgModule({
  declarations: [
    CanteenPage,
  ],
  imports: [
    IonicPageModule.forChild(CanteenPage),
    TranslateModule.forChild()
  ],
})
export class CanteenPageModule {}
