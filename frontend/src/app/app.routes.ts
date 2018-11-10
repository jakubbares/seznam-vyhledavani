import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchPage} from "./pages/search/search.page";
import {HistoryPage} from "./pages/history/history.page";



export const router: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'history', component: HistoryPage },
  { path: 'search', component: SearchPage },
  { path: '**', redirectTo: 'search' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
