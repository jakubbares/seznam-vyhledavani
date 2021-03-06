import { Component, OnInit } from '@angular/core';
import {QueryService} from "../../services/query.service";

@Component({
  selector: 'sz-history-page',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.css']
})
export class HistoryPage {
  userArticles = {};
  users: string[];
  constructor(
    private queryService: QueryService
  ) {
    this.users = Object.keys(this.queryService.historiesMap);
    this.users.forEach(userName => {
      this.queryService.getArticles(this.queryService.historiesMap[userName]).subscribe(data => {
        this.userArticles[userName] = data;
      });
    });
  }

}
