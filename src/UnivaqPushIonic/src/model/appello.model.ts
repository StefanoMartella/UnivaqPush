import { Insegnamento } from './insegnamento.model';

export class Appello {
    
    id: number;
    descrizione: string;
    dataAppello: Date;
    tipologiaEsame: string;
    insegnamento: Insegnamento;

}

export const TIPOLOGIA_ESAME_SCRITTO = "SCRITTO";
export const TIPOLOGIA_ESAME_ORALE = "ORALE";
export const TIPOLOGIE_ESAMI = [TIPOLOGIA_ESAME_SCRITTO, TIPOLOGIA_ESAME_ORALE];