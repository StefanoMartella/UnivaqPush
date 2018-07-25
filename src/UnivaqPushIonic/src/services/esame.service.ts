import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Esame } from "../model/esame";
import { URL } from "../constants";

@Injectable()
export class EsameService {
  constructor(private http: HttpClient) {}

  list(): Observable<Array<Esame>> {
    return this.http.get<Array<Esame>>(URL.ESAMI);
  }

}
