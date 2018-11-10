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
      "Politics": ["8b66a26adef1a628", "939b47f04e3f1246", "6e631de2f3f47090", "939b47f04e3f1246", "698aa051e5028eaf", "cf6c62fa32db4645"],
      "Sport": [],
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

  getQuerySuggestions(): Observable<any> {
    return this.http.get(this.baseUrl + '/suggestions')
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
