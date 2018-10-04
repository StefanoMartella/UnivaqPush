import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class FacebookService {

  constructor(private http: Http) { }

  private accessToken = "TOKEN";

  private graphUrl = "https://graph.facebook.com/1734437656634030";
  private graphQuery = `?access_token=${this.accessToken}
                        &date_format=U&fields=posts{from,created_time,message,attachments}`;

  getPosts(): Observable<any[]> {
    let url = this.graphUrl + this.graphQuery;

    return this.http.get(url).map(response => response.json().posts.data);
  }
}