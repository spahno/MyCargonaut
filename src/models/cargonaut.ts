export class Cargonaut {
    public id: string;
    public mail: string;
    public username: string;
    public profile_image: string;

    constructor(mail: string, username: string, profile_image: string) {
        this.mail = mail;
        this.username = username;
        this.profile_image = profile_image;
    }
}
