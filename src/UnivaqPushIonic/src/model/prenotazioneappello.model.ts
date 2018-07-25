import { Utente } from "./utente.model";
import { Appello } from "./appello.model";
import { Insegnamento } from "./insegnamento.model";

export class PrenotazioneAppello{

    id: number;
    statoPrenotazione: string;
    utente: Utente;
    appello: Appello;
    insegnamento: Insegnamento;

}