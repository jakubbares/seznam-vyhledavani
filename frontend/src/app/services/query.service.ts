import {Injectable, OnInit} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class QueryService {
  private baseUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {
  }

  getResultsForQueryAndHistory(query: string, history: string[]): Observable<any> {
    return this.http.post(this.baseUrl + '/query', {"query": query, "history": history})
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
