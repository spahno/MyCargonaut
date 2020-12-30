export interface Fahrzeug {
    _id?: string;
    nummernschild: string;
    marke: string;
    modell: string;
    fahrzeugart: string;
    farbe: string;
    baujahr: number;
    ladeflaeche: [{
        hoehe: number,
        breite: number,
        tiefe: number
    }]
}
