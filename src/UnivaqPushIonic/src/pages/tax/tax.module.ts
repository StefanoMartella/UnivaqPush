import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from "@ngx-translate/core";

import { TaxPage } from './tax';

@NgModule({
  declarations: [
    TaxPage,
  ],
  imports: [
    IonicPageModule.forChild(TaxPage),
    TranslateModule.forChild()
  ],
})
export class TaxPageModule {}
