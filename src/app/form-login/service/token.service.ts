import { Injectable } from '@angular/core';
const ID_KEY = 'ID_KEY';
const USERNAME_KEY = 'Username_Key';
const TOKEN_KEY = 'Token_Key';
const ROLESET_KEY = 'RoleSet_Key';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public roleSet = [];

  constructor() { }

  public setID(id: string) {
    localStorage.removeItem(ID_KEY);
    localStorage.setItem(ID_KEY, id);
  }

  public getID():string {
    return localStorage.getItem(ID_KEY);
  }

  public setUsername(username: string) {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername():string {
    return localStorage.getItem(USERNAME_KEY);
  }

  public setToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken():string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public setRoleSet(roleSet: string[]) {
    localStorage.removeItem(ROLESET_KEY);
    localStorage.setItem(ROLESET_KEY, JSON.stringify(roleSet));
  }

  public getRoleSet(): string[] {
    this.roleSet = [];
    if (this.getToken()) {
      JSON.parse(localStorage.getItem(ROLESET_KEY)).forEach(roleSet => {
        this.roleSet.push(roleSet.authority);
      })
    }
    return this.roleSet;
  }

}
