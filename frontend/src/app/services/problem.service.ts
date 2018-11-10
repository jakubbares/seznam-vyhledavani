import {Injectable, OnInit} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {Argument, Problem, ProblemSubproblem} from '../models/models';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable()
export class ProblemService {
  private baseUrl = `${environment.apiUrl}/problems`;
  constructor(private http: HttpClient) {
  }

  getProblemById(problem_id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/' + problem_id )
      .catch(this.handleError);
  }

  getProblemsByIds(problem_ids: number[]): Observable<any> {
    return this.http.post(this.baseUrl + '/ids', {"data": { "problem_ids": problem_ids }})
      .catch(this.handleError);
  }

  getProblemsForCategoryAndTopics(topic_ids: number[], category_id: number): Observable<any> {
    return this.http.post(this.baseUrl + '/category/' + category_id + '/topic/ids', {"data": { "topic_ids": topic_ids }})
      .catch(this.handleError);
  }

  getProblemsForCategory(category_id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/category/' + category_id )
      .catch(this.handleError);
  }

  getParentProblems(problem_id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/parent/' + problem_id)
      .catch(this.handleError);
  }

  getSubProblems(problem_id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/sub/' + problem_id)
      .catch(this.handleError);
  }

  postProblem(problem: Problem): Observable<any> {
    return this.http.post(this.baseUrl, JSON.stringify({ "data": {"type": "data", "attributes": { problem }}}))
      .catch(this.handleError);
  }

  linkProblem(problem: ProblemSubproblem): Observable<any> {
    return this.http.post(this.baseUrl + '/link', JSON.stringify({ "data": {"type": "data", "attributes": { problem }}}))
      .catch(this.handleError);
  }

  patchProblem(problem: Problem): Observable<any> {
    return this.http.patch(this.baseUrl + '/' + problem.id,  JSON.stringify({ "data": {"type": "data", "attributes": { problem: problem }}}))
      .catch(this.handleError);
  }

  deleteProblem(problem: Problem): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + problem.id)
      .catch(this.handleError);
  }

  unlinkProblem(parent_id: number, sub_id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/unlink/' + parent_id + '/' + sub_id)
      .catch(this.handleError);
  }

  getAllProblems(): Observable<any> {
    return this.http.get(this.baseUrl)
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
