import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from "@ngx-translate/core";

import { BookletPage } from './booklet';

@NgModule({
  declarations: [
    BookletPage,
  ],
  imports: [
    IonicPageModule.forChild(BookletPage),
    TranslateModule.forChild()
  ],
})
export class BookletPageModule {}
