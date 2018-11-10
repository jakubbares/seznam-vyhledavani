import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'sz-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() article: any;
  @ViewChild('title') title;
  @ViewChild('description') description;
  constructor() { }

  ngOnInit() {
    this.title.nativeElement.innerHTML = this.article.title;
    this.description.nativeElement.innerHTML = this.article.description;
  }


}
