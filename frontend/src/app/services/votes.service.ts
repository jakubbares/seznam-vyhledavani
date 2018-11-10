import {Injectable, OnInit} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable()
export class VotesService {
  private baseUrl = `${environment.apiUrl}/votes`;
  constructor(private http: HttpClient) {
  }

  getVotesForArguments(argument_ids: number[]): Observable<any> {
    return this.http.post(this.baseUrl + '/argument/ids', {"data": { "argument_ids": argument_ids }})
      .catch(this.handleError);
  }

  getVotesForArgument(argument_id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/argument/' + argument_id )
      .catch(this.handleError);
  }

  postVotes(votes: any): Observable<any> {
    return this.http.post(this.baseUrl, JSON.stringify({ "data": {"type": "data", "attributes": { votes }}}))
      .catch(this.handleError);
  }

  deleteVotes(votes: any): Observable<any> {
    return this.http.delete(this.baseUrl + "/" + votes.id)
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
