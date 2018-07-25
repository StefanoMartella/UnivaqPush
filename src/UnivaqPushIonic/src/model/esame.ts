import { Utente } from "./utente.model";
import { Insegnamento } from "./insegnamento.model";

export class Esame {

    id: number;
    statoEsame: string;
    dataEsame: Date;
    voto: number;
    insegnamento: Insegnamento;
    utente: Utente;

}
