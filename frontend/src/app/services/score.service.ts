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
export class ScoreService implements OnInit {
  private baseUrl = `${environment.apiUrl}/score`;
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
  }

  getScoreForArgumentAndUser(argument_id: number, user_id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/user/' + user_id + '/argument/' + argument_id)
      .catch(this.handleError);
  }

  getScoreForArgumentsAndUser(argument_ids: number[], user_id: number): Observable<any> {
    return this.http.post(this.baseUrl + '/user/' + user_id + '/argument/ids', {"data": { "argument_ids": argument_ids }} )
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
