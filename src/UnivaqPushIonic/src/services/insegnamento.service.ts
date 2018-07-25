import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Appello } from '../model/appello.model';
import { Insegnamento } from '../model/insegnamento.model';
import { PrenotazioneAppello } from '../model/prenotazioneappello.model';
import { URL } from '../constants';

@Injectable()
export class InsegnamentoService {
  constructor(private http: HttpClient) {}

  listInsegnamenti(): Observable<Array<Insegnamento>> {
    return this.http.get<Array<Insegnamento>>(URL.INSEGNAMENTI);
  }

  listAppelli(idInsegnamento): Observable<Array<Appello>> {
    let appelliUrl = `${URL.INSEGNAMENTI}/${idInsegnamento}/appelli`;
    return this.http.get<Array<Appello>>(appelliUrl);
  }

  listAppelliStudente(idInsegnamento): Observable<Array<PrenotazioneAppello>> {
    return this.http.get<Array<PrenotazioneAppello>>(
      `${URL.PRENOTAZIONE_APPELLO}/${idInsegnamento}`
    );
  }

  createAppello(appello: Appello) {
    return this.http.post<Appello>(URL.APPELLI, appello);
  }

  findAppelloById(idAppello: number): Observable<Appello> {
    let appelloUrl = `${URL.APPELLI}/${idAppello}`;
    return this.http.get<Appello>(appelloUrl);
  }

  updateAppello(appello: Appello) {
    return this.http.put<Appello>(URL.APPELLI, appello);
  }

  deleteAppello(appello: Appello) {
    let deleteUrl = `${URL.APPELLI}/${appello.id}`;
    return this.http.delete<Appello>(deleteUrl);
  }

  updatePrenotazioneAppello(prenotazioneAppello: PrenotazioneAppello) {
      return this.http.put<Appello>(URL.PRENOTAZIONE_APPELLO, prenotazioneAppello);
  }
  
}