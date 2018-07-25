import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Tax } from "../model/tax.model";
import { URL } from "../constants";

@Injectable()
export class TaxService {
  constructor(private http: HttpClient) {}

  list(): Observable<Array<Tax>> {
    return this.http.get<Array<Tax>>(URL.TASSE);
  }

}
