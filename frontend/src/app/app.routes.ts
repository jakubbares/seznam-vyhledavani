import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {UserPage} from "./pages/user/user.page";
import {ProblemPage} from "./pages/problem/problem.page";
import {CategoryPage} from "./pages/category/category.page";
import {SearchPage} from './pages/search/home.page';


export const router: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'user', component: UserPage },
  { path: 'problem/:problem_id', component: ProblemPage },
  { path: 'category/:category_id', component: CategoryPage },
  { path: 'home', component: SearchPage},
  { path: '**', redirectTo: 'home' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
