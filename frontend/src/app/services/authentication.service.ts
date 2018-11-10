import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {User} from "../models/models";
import * as _ from 'lodash';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable()
export class AuthenticationService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
  }

  isLoggedIn() {
    return !!localStorage['currentUser'];
  }

  login(username: string, password: string) {
    const body = JSON.stringify({
      username: username,
      password: password
    });
    return this.http.post(this.baseUrl, body)
      .map((response: Response) => {
        let user = response.json().data;
        // user['ethAddress'] = (_.find(this.accounts, ['role', user.role])).address;
        if (!!user) {
          // store user details in local storage to keep user logged in between page refreshes
        }
        return user;
      });
    }

  checkUser(username: string) {
      const body = JSON.stringify({
          username: username
      });
      return this.http.post(this.baseUrl + '/check', body)
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
