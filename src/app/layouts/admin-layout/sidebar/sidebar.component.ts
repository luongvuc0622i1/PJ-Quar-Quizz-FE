import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/profile', title: 'Profile',  icon:'pe-7s-user', class: '' },
    { path: '/admin/account', title: 'Account',  icon:'pe-7s-note2', class: '' },
];

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
