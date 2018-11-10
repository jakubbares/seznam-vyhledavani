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
  historiesMap: any = {};
  constructor(private http: HttpClient) {
    this.historiesMap = {
      "John": [],
      "Mary": [],
      "Joe": []
    };
  }

  getResultsForQueryAndHistory(query: string, articles_ids: string[]): Observable<any> {
    return this.http.post(this.baseUrl + '/query', {"query": query, "history": articles_ids})
      .catch(this.handleError);
  }

  getArticles(articles_ids: string[]): Observable<any> {
    return this.http.post(this.baseUrl + '/articles', {"history": articles_ids})
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
