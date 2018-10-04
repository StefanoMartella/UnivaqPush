import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { SecretaryPage } from './secretary';

@NgModule({
  declarations: [
    SecretaryPage,
  ],
  imports: [
    IonicPageModule.forChild(SecretaryPage),
    TranslateModule.forChild()
  ],
})
export class SecretaryPageModule {}
