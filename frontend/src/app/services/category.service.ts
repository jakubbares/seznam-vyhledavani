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
export class CategoryService {
  private baseUrl = `${environment.apiUrl}/categories`;
  constructor(private http: HttpClient) {
  }
  getCategoryById(id): Observable<any> {
    return this.http.get(this.baseUrl + '/' + id)
      .catch(this.handleError);
  }

  getAllCategories(): Observable<any> {
    return this.http.get(this.baseUrl)
      .catch(this.handleError);
  }

  postCategory(category: any): Observable<any> {
    return this.http.post(this.baseUrl, JSON.stringify({"data": {"type": "data", "attributes": { category }}}))
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
