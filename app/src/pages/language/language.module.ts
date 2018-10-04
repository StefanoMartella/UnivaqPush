import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";

import { createTranslateLoader } from '../../app/app.module'

import { LanguagePage } from "./language";

@NgModule({
  declarations: [
    LanguagePage,
  ],
  imports: [
    IonicPageModule.forChild(LanguagePage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }})
  ],
})
export class LanguagePageModule {}
