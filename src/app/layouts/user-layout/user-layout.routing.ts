import { Routes } from '@angular/router';

import {ResultListComponent} from "../../user-pages/result/result-list/result-list.component";
import {ResultDetailComponent} from "../../user-pages/result/result-detail/result-detail.component";
import {UserHomeComponent} from "../../user-pages/user-home/user-home.component";
import {ProfileComponent} from "../../manager-pages/profile/profile.component";

export const UserLayoutRoutes: Routes = [
  { path: 'home',           component: UserHomeComponent },
  { path: 'profile',        component: ProfileComponent },
  { path: 'results',        component: ResultListComponent },
  { path: 'results/:id',    component: ResultDetailComponent },
];
