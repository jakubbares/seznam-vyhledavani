import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {AutoCompleteModule} from 'primeng/primeng';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {routes} from './app.routes';

import {QueryService} from './services/query.service';
import {SearchPage} from "./pages/search/search.page";
import { ArticleComponent } from './components/article/article.component';
import { HistoryPage } from './pages/history/history.page';
import {NavigationComponent} from "./components/navigation/navigation.component";



@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MultiSelectModule,
    DropdownModule,
    TableModule,
    AutoCompleteModule,
    ButtonModule,
    routes
  ],
  declarations: [
    AppComponent,
    SearchPage,
    ArticleComponent,
    NavigationComponent,
    HistoryPage
  ],
  providers: [
    QueryService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
