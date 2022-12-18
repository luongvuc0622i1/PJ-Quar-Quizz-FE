import { Routes } from '@angular/router';
import {ProfileComponent} from "../../manager-pages/profile/profile.component";
import {ListUserComponent} from "../../manager-pages/result/list-user/list-user.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'profile',        component: ProfileComponent },
    { path: 'account',        component: ListUserComponent },
];
