import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { AdsuPage } from './adsu';

@NgModule({
  declarations: [
    AdsuPage,
  ],
  imports: [
    IonicPageModule.forChild(AdsuPage),
    TranslateModule.forChild()
  ],
})
export class AdsuPageModule {}
