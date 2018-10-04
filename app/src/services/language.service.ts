import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

export interface Language {
    label: string;
    value: string;
}

@Injectable()
export class LanguageService {

  italian: Language = { label: "ITALIAN", value: "it" };

  languages: Array<Language> = [
      this.italian,
      { label: "ENGLISH", value: "en" },
      { label: "SPANISH", value: "es" }
  ];

  constructor(private storage: Storage) {}

  getActualLanguage(): Observable<string> {
    return fromPromise(this.storage.get("language"));
  }

  getPreferredLanguage(): string {
    return this.italian.value;
  }

  getLanguages(): Array<Language> {
    return this.languages;
  }

  updateLanguage(newLanguage: string) {
    this.storage.set("language", newLanguage);
  }
  
}
