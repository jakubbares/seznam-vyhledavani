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
      "Politics": ["1e5c3ad9ed4e42a5", "1ef412c95d3287d2", "d04f61aeca8e9c26", "8b66a26adef1a628", "939b47f04e3f1246", "6e631de2f3f47090", "939b47f04e3f1246", "698aa051e5028eaf"],
      "Sport": ["9dcec99f7d983863","1fdb667d96220614", "83c14a35a6233231","98c788942aaeda4c","dcc66fc20da7a28f","4a6f25e2057b2ad2","b7fb7a18dffd2771", "3298ec005949981a"],
      "Business": ["62947440edea30e6", "f3d260b5e6987df6", "355d032c4c83c482", "424624dff2a0cb49", "a5d5d8b41068db51", "7eb73cecb6a613d9", "9a5dcdb0f6cc21b7", "c77d96a48863c7bc"]
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
