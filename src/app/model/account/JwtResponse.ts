export class JwtResponse {
    id: string;
    username: string;
    token: string;
    roleSet: any[];


    constructor(id: string, username: string, token: string, roleSet: any[]) {
        this.id = id;
        this.username = username;
        this.token = token;
        this.roleSet = roleSet;
    }

}