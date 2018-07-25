import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { Utente } from '../model/utente.model';
import { AUTH_TOKEN, URL, UTENTE_STORAGE, X_AUTH, ACCOUNT_STORAGE } from '../constants';


export interface Account {
    username: string;
    password: string;

}

@Injectable()
export class UtenteService {
    private tokenUtente: string;

    constructor(private http: HttpClient, private storage: Storage) {
        this.storage.get(AUTH_TOKEN).then((token) => {
            this.tokenUtente = token;
        });
    }

    login(account: Account): Observable<Utente> {
        return this.http.post<Utente>(URL.LOGIN, account, { observe: 'response' })
            .map((resp: HttpResponse<Utente>) => {
                const token = resp.headers.get(X_AUTH);
                this.storage.set(AUTH_TOKEN, token);
                this.tokenUtente = token;
                //Utente memorizzato nello storage in modo tale che se si vuole cambiare il
                //profilo dell'utente stesso non si fa una chiamata REST. 
                this.storage.set(UTENTE_STORAGE, resp.body);
                this.storage.set(ACCOUNT_STORAGE, account);
                return resp.body;
            });        
    }

    logout() {
        this.tokenUtente = "";
        this.storage.remove(AUTH_TOKEN);
        this.storage.remove(UTENTE_STORAGE);
        //Nessuna chiamata al server perche' JWT e' stateless quindi non prevede alcun logout.
        //Per gestirlo si dovrebbe fare lato server una blacklist.
    }

    getUtente(): Observable<Utente> {
        return fromPromise(this.storage.get(UTENTE_STORAGE));
    }

    getAccount(): Observable<Account> {
        return fromPromise(this.storage.get(ACCOUNT_STORAGE));
    }

    getUtenteToken(): string {
        return this.tokenUtente;
    }

    updateProfilo(nuovoUtente: Utente): Observable<Utente> {
        return this.http.post<Utente>(URL.UPDATE_PROFILO, nuovoUtente, { observe: 'response' })
            .map((resp: HttpResponse<Utente>) => {
                //Aggiornamento dell'utente nello storage.
                //Utente memorizzato nello storage per evitare chiamata REST quando si vuole modificare il profilo
                //e se l'utente chiude la app e la riapre i dati sono gia' presenti
                this.storage.set(UTENTE_STORAGE, resp.body);
                return resp.body;
            });
    }


}