import {Component, OnInit} from '@angular/core';
import {QueryService} from "../../services/query.service";


@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html'
})
export class SearchPage {
  queries: string[];
  query: string;
  querySuggestions: string[];
  articles: any[];
  userName: string;
  users: string[];
  constructor(
    private queryService: QueryService
  ) {
    this.queries = ['test', 'one', 'two'];
    this.users = Object.keys(this.queryService.historiesMap);
  }


  search(query) {
    const history = this.queryService.historiesMap[this.userName];
    this.queryService.getResultsForQueryAndHistory(query, history).subscribe(data => {
      this.articles = data.data;
    })
  }

  completeQuery(query) {
    this.querySuggestions = this.queries.filter(q => {
      return q.indexOf(query) != -1
    })
  }
}
