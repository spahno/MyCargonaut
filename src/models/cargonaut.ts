export interface Cargonaut {
    _id?: string;
    username: string;
    vorname: string;
    nachname: string;
    geb_dat?: string;
    profile_image?: string;
    mail: string;
    telefon?: string;
    bewertung: number;
    fahrzeuge: string[];
    angebote: string[];
    gesuche: string[];
    anfragen: string[];
}
