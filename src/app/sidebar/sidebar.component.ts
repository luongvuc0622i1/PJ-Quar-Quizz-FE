import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/manager/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/manager/user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
    { path: '/manager/category', title: 'Category',  icon:'pe-7s-note2', class: '' },
    { path: '/manager/quiz/list', title: 'Quiz',  icon:'pe-7s-light', class: '' },
    { path: '/manager/test/list', title: 'Test',  icon:'pe-7s-study', class: '' },
    { path: '/manager/result', title: 'Results',  icon:'pe-7s-note2', class: '' },
    // { path: '/manager/table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
    // { path: '/manager/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
    // { path: '/manager/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    // { path: '/manager/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    // { path: '/manager/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
