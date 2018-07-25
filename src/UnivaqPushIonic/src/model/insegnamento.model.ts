import { CorsoDiLaurea } from "./corsodilaurea.model";

export class Insegnamento {
    
    id: number;
    codice: string;
    denominazione: string;    
    corsolaurea: string;
    lingua: string;
    cfu: number;
    tipologiaCredito: string;
    periodoInsegnamento: number;
    corsoDiLaurea: CorsoDiLaurea;
    

}