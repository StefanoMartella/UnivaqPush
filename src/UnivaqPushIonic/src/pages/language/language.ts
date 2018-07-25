import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { IonicPage } from 'ionic-angular';

import { LanguageService } from "../../services/language.service";

@IonicPage()
@Component({
  selector: "page-language",
  templateUrl: "language.html"
})
export class LanguagePage {

  protected current_language: string;
  protected languages: any;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService) { }

  ionViewDidLoad() {
    this.languages = this.languageService.getLanguages();

    this.languageService.getActualLanguage().subscribe((language: string) => {
      if (language != null)
        this.current_language = language;
      else
        this.current_language = this.languageService.getPreferredLanguage();
    });
  }

  changeLanguage(language) {
    this.current_language = language;
    this.translate.use(language);
    this.languageService.updateLanguage(language);
  }

}
