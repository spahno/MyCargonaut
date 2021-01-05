export class Fahrzeug {
    public id?: string;
    public nummernschild: string;
    public marke: string;
    public modell: string;
    public fahrzeugart: string;
    public farbe: string;
    public baujahr: number;
    public ladeflaeche: {
        hoehe: number,
        breite: number,
        tiefe: number
    };
}
