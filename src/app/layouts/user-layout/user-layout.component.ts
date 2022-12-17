import {Component, OnInit} from '@angular/core';
import {filter, Subscription} from "rxjs";
import {Location, PopStateEvent} from "@angular/common";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import PerfectScrollbar from "perfect-scrollbar";

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: '/user/dashboard', title: 'Dashboard', icon: 'pe-7s-graph', class: ''},
    {path: '/user/user', title: 'User Profile', icon: 'pe-7s-user', class: ''},
    {path: '/user/test', title: 'Test', icon: 'pe-7s-study', class: ''},
    {path: '/user/table', title: 'Table List', icon: 'pe-7s-note2', class: ''},
    {path: '/user/typography', title: 'Typography', icon: 'pe-7s-news-paper', class: ''},
    {path: '/user/icons', title: 'Icons', icon: 'pe-7s-science', class: ''},
    {path: '/user/maps', title: 'Maps', icon: 'pe-7s-map-marker', class: ''},
    {path: '/user/notifications', title: 'Notifications', icon: 'pe-7s-bell', class: ''},
];

@Component({
    selector: 'app-user-layout',
    templateUrl: './user-layout.component.html',
    styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
}
