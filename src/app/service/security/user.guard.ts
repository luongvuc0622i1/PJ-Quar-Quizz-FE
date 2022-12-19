import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from "../account/token.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private tokenService: TokenService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.tokenService.getToken()) {
      if (JSON.stringify(this.tokenService.getRoleSet())==JSON.stringify(["ADMIN"])) {
        Swal.fire(
            'ADMIN',
            'You are working on the USER branch!',
            'warning'
        )
        return true;
      }
      if (this.tokenService.getToken()) {
        if (JSON.stringify(this.tokenService.getRoleSet())==JSON.stringify(["MANAGER"])) {
          Swal.fire(
              'MANAGER',
              'You are working on the User branch!',
              'warning'
          )
          return true;
        }
      }
      if (this.tokenService.getToken()) {
        if (JSON.stringify(this.tokenService.getRoleSet())==JSON.stringify(["USER"])) {
          return true;
        }
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Can not Access!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
        this.router.navigate(['account']);
      }

    }



  }
  
}
