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
import { ModalModule } from 'ngx-bootstrap/modal'
import {PopoverModule} from './components/ng2-popover/popover.module';

import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {routes} from './app.routes';



import {QueryService} from './services/query.service';
import {SearchPage} from "./pages/search/search-page.component";



@NgModule({
  imports: [
    HttpClientModule,
    PopoverModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MultiSelectModule,
    DropdownModule,
    TableModule,
    AutoCompleteModule,
    ButtonModule,
    routes
  ],
  declarations: [

    AppComponent,
    SearchPage
  ],
  providers: [,
    QueryService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
