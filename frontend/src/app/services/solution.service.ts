import {Injectable, OnInit} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {ProblemSolution, Solution} from '../models/models';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class SolutionService implements OnInit {
  private baseUrl = `${environment.apiUrl}/solutions`;
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
  }

  getSolutionById(solution_id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/' + solution_id )
      .catch(this.handleError);
  }

  getSolutionsByIds(solution_ids: number[]): Observable<any> {
    return this.http.post(this.baseUrl + '/ids', {"data": { "solution_ids": solution_ids }})
      .catch(this.handleError)
  }
  
  getSolutionsForProblem(problem_id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/problem/' + problem_id )
      .catch(this.handleError);
  }

  getSolutionsForProblems(problem_ids: number[]): Observable<any> {
    return this.http.post(this.baseUrl + '/problem/ids', {"data": { "problem_ids": problem_ids }})
      .catch(this.handleError);
  }

  postSolution(solution: Solution): Observable<any> {
    return this.http.post(this.baseUrl, JSON.stringify({ "data": {"type": "data", "attributes": { solution }}}) )
      .catch(this.handleError);
  }

  linkSolution(solution: ProblemSolution): Observable<any> {
    return this.http.post(this.baseUrl + "/link", JSON.stringify({ "data": {"type": "data", "attributes": { solution }}}) )
      .catch(this.handleError);
  }

  patchSolution(solution: Solution): Observable<any> {
    return this.http.patch(this.baseUrl + '/' + solution.id,  JSON.stringify({ "data": {"type": "data", "attributes": { solution }}}))
      .catch(this.handleError);
  }

  deleteSolution(solution: Solution): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + solution.id)
      .catch(this.handleError);
  }

  unlinkSolution(problem_id: number, solution_id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/unlink/' + problem_id + '/' + solution_id)
      .catch(this.handleError);
  }
  
  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
