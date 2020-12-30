export class User {
    public id: string;
    public email: string;
    public username: string;

    constructor(email: string, username: string) {
        this.email = email;
        this.username = username;
    }
}
