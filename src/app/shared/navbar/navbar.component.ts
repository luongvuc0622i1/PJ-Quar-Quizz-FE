import { Component, OnInit, ElementRef } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {LogoutService} from "../../service/logout.service";

@Component({
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(location: Location,
                private element: ElementRef,
                private logoutService: LogoutService) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle(){
        let path = this.location.prepareExternalUrl(this.location.path());
        let title = path.split("/")[2];
        return title;
    }

    logOut() {
        this.logoutService.logOut();
    }
}
