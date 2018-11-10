import {Injectable, OnInit} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {Argument, Comment} from '../models/models';
  import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class CommentService implements OnInit {
  private baseUrl = `${environment.apiUrl}/comments`;
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
  }

  getCommentById(comment_id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/' + comment_id )
      .catch(this.handleError);
  }

  getCommentQualityById(cq_id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/quality/' + cq_id )
      .catch(this.handleError);
  }

  getCommentsForArgument(argument_id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/argument/' + argument_id )
      .catch(this.handleError);
  }

  getCommentsForArguments(argument_ids: number[]): Observable<any> {
    return this.http.post(this.baseUrl + '/argument/ids', {"data": { "argument_ids": argument_ids }})
      .catch(this.handleError);
  }

  postComment(comment: Comment): Observable<any> {
    return this.http.post(this.baseUrl, JSON.stringify({ "data": {"type": "data", "attributes": { comment }}}))
      .catch(this.handleError);
  }

  patchComment(comment: Comment): Observable<any> {
    return this.http.patch(this.baseUrl + '/' + comment.id,  JSON.stringify({ "data": {"type": "data", "attributes": { comment }}}))
      .catch(this.handleError);
  }

  deleteComment(comment: Comment): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + comment.id)
      .catch(this.handleError);
  }

  postCommentQuality(commentq: any): Observable<any> {
    return this.http.post(this.baseUrl + '/quality' , JSON.stringify({ "data": {"type": "data", "attributes": { commentq }}}))
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
