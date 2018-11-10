import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sz-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  @Input() article: any;
  constructor() { }


}
