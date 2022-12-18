import {Component, OnInit} from '@angular/core';
import {LogoutService} from "../../service/logout.service";

@Component({
    selector: 'app-user-layout',
    templateUrl: './user-layout.component.html',
    styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {
    id: number = Number(localStorage.getItem('ID_KEY'));

    constructor(private logoutService: LogoutService) {
    }

    ngOnInit() {
    }

    logOut() {
        this.logoutService.logOut();
    }
}
