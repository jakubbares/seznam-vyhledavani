import {Injectable, OnInit} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {Argument, Comment, Composition, CompositionFact, Fact, ProblemSubproblem} from '../models/models';
  import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class FactService implements OnInit {
  private baseUrl = `${environment.apiUrl}/facts`;
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
  }

  getFactById(fact_id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/' + fact_id )
      .catch(this.handleError);
  }

  getFactsForComposition(composition: Composition): Observable<any> {
    return this.http.get(this.baseUrl + '/composition/' + composition.id)
      .catch(this.handleError);
  }

  getFactsForCompositions(composition_ids: number[]): Observable<any> {
    return this.http.post(this.baseUrl + '/composition/ids', JSON.stringify({ "data": { composition_ids }}))
      .catch(this.handleError);
  }

  postFact(fact: Fact): Observable<any> {
    return this.http.post(this.baseUrl, JSON.stringify({ "data": {"type": "data", "attributes": { fact }}}))
      .catch(this.handleError);
  }

  patchFact(fact: Fact): Observable<any> {
    return this.http.patch(this.baseUrl + '/' + fact.id,  JSON.stringify({ "data": {"type": "data", "attributes": { fact }}}))
      .catch(this.handleError);
  }

  deleteFact(fact: Fact): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + fact.id)
      .catch(this.handleError);
  }

  linkFact(cf: CompositionFact): Observable<any> {
    return this.http.post(this.baseUrl + '/link', JSON.stringify({ "data": {"type": "data", "attributes": { cf }}}))
      .catch(this.handleError);
  }

  unlinkFact(composition_id: number, fact_id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/unlink/' + composition_id + '/' + fact_id)
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
