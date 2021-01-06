export class User {
    public id: string;
    public email: string;
    public username: string;
    public vorname: string;
    public nachname: string;
    public gebDat?: string;
    public profileImage?: string;
    public telefon?: number;
    public bewertung: number;
    public fahrzeuge: string[];
    public interessierteAngebote: string[];
    public interessierteGesuche: string[];
    public erstellteAngebote: string[];
    public erstellteGesuche: string[];

    constructor(email: string, username: string, vorname: string, nachname: string) {
        this.email = email;
        this.username = username;
        this.vorname = vorname;
        this.nachname = nachname;
    }
}
