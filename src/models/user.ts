export class User {
    public id: string;
    public email: string;
    public username: string;
    public vorname: string;
    public nachname: string;
    public gebDat?: string;
    public profileImage?: string;
    public telefon?: string;
    public bewertung: number;
    public fahrzeuge: string[];
    public angebote: string[];
    public gesuche: string[];
    public anfragen: string[];

    constructor(email: string, username: string, vorname: string, nachname: string) {
        this.email = email;
        this.username = username;
        this.vorname = vorname;
        this.nachname = nachname;
    }
}
