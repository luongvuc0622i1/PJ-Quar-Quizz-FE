import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/manager/profile', title: 'Profile',  icon:'pe-7s-user', class: '' },
    { path: '/manager/categories', title: 'Category',  icon:'pe-7s-note2', class: '' },
    { path: '/manager/quizzes', title: 'Quiz',  icon:'pe-7s-light', class: '' },
    { path: '/manager/tests', title: 'Test',  icon:'pe-7s-study', class: '' },
    { path: '/manager/users', title: 'User',  icon:'pe-7s-note2', class: '' },
];

@Component({
  selector: 'app-sidebar-manager',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
