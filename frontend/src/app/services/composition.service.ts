import {Injectable, OnInit} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {Argument, Composition, CompositionFact, Problem, ProblemSubproblem} from '../models/models';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable()
export class CompositionService {
  private baseUrl = `${environment.apiUrl}/compositions`;
  constructor(private http: HttpClient) {
  }

  getCompositionById(composition_id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/' + composition_id )
      .catch(this.handleError);
  }

  getCompositionsForCategory(category_id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/category/' + category_id)
      .catch(this.handleError);
  }

  getSubCompositionsForComposition(composition_id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/composition/' + composition_id)
      .catch(this.handleError);
  }

  postComposition(composition: Composition): Observable<any> {
    return this.http.post(this.baseUrl, JSON.stringify({ "data": {"type": "data", "attributes": { composition }}}))
      .catch(this.handleError);
  }

  patchComposition(composition: Composition): Observable<any> {
    return this.http.patch(this.baseUrl + '/' + composition.id,  JSON.stringify({ "data": {"type": "data", "attributes": { composition }}}))
      .catch(this.handleError);
  }

  deleteComposition(composition: Composition): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + composition.id)
      .catch(this.handleError);
  }

  getAllCompositions(): Observable<any> {
    return this.http.get(this.baseUrl)
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
