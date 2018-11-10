import {Injectable, OnInit} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {HttpClient} from '@angular/common/http';
import {Problem, Topic} from '../models/models';
import {environment} from '../../environments/environment';


@Injectable()
export class TopicService {
  private baseUrl = `${environment.apiUrl}/topics`;
  constructor(private http: HttpClient) {
  }

  getTopicsByIds(topic_ids: number[]): Observable<any> {
    return this.http.post(this.baseUrl + '/ids', {"data": { "topic_ids": topic_ids }})
      .catch(this.handleError);
  }

  getTopicsForCategory(category_id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/category/' + category_id )
      .catch(this.handleError);
  }

  postTopic(topic: any): Observable<any> {
    return this.http.post(this.baseUrl, JSON.stringify({ "data": {"type": "data", "attributes": { topic }}}))
      .catch(this.handleError);
  }

  patchTopic(topic: Topic): Observable<any> {
    return this.http.patch(this.baseUrl + '/' + topic.id,  JSON.stringify({ "data": {"type": "data", "attributes": { topic: topic }}}))
      .catch(this.handleError);
  }

  deleteTopic(topic: Topic): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + topic.id)
      .catch(this.handleError);
  }

  getAllTopics(): Observable<any> {
      return this.http.get(this.baseUrl)
        .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
