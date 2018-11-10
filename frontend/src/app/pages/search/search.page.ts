import {Component, OnInit} from '@angular/core';
import {QueryService} from "../../services/query.service";


@Component({
  selector: 'sz-search-page',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.css']
})
export class SearchPage {
  queries: any[];
  query: any;
  querySuggestions: string[];
  articles: any[];
  userName: string;
  users: string[];
  constructor(
    private queryService: QueryService
  ) {
    window['search'] = this;
    this.queryService.getQuerySuggestions().subscribe(data => {
      this.queries = data;
    });
    this.users = Object.keys(this.queryService.historiesMap);
  }


  search(query) {
    const history = this.queryService.historiesMap[this.userName];
    this.queryService.getResultsForQueryAndHistory(query.query, history).subscribe(data => {
      this.articles = data;
    })
  }

  completeQuery(event) {
    this.querySuggestions = this.queries.filter(q => {
      return q.query.indexOf(event.query.toLowerCase()) != -1
    })
  }

  selectUser(user) {
    this.userName = user;
  }
}
