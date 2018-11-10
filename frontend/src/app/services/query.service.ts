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
      "Politics": ["698aa051e5028eaf", "1e5c3ad9ed4e42a5", "b7fb7a18dffd2771"],
      "Sport": [ "6e631de2f3f47090","cb4b7a2a7ef0b1f4", "c77d96a48863c7bc"],
      "Business": ["62947440edea30e6", "9a5dcdb0f6cc21b7","355d032c4c83c482", "a5d5d8b41068db51"]
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
