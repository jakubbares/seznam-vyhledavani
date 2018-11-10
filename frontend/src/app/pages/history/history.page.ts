import { Component, OnInit } from '@angular/core';
import {QueryService} from "../../services/query.service";

@Component({
  selector: 'ko-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryPage {
  userArticles = {};
  constructor(
    private queryService: QueryService
  ) {
    const users = Object.keys(this.queryService.historiesMap);
    users.forEach(userName => {
      this.queryService.getArticles(this.queryService.historiesMap[userName]).subscribe(data => {
        this.userArticles[userName] = data.data;
      });
    });
  }

}
