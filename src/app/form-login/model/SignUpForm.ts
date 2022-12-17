export class SignUpForm {
    username: string;
    email: string
    password: string;
    roles: string[];
    status: string;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.status = "1";
    }

}