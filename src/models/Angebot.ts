import {Anfrage} from './Anfrage';

export class Angebot extends Anfrage {
    kunden: string[] = [];
    interessenten: string[] = [];
    fahrzeugId: string;

    getInteressenten(): Interessent[] {
        const interessenten: Interessent[] = [];
        this.interessenten.forEach(interessent => {
            interessenten.push(JSON.parse(interessent));
        });
        return interessenten;
    }

    addInteressent(interessent: Interessent): Angebot {
        this.interessenten.push(JSON.stringify(interessent));
        return this;
    }

    deleteInteressent(interessent: Interessent): Angebot {
        this.interessenten = this.interessenten.filter(e => {
            return JSON.parse(e).userId !== interessent.userId && JSON.parse(e).objectId !== interessent.objectId;
        });
        return this;
    }

    getKunden(): Interessent[] {
        const kunden: Interessent[] = [];
        this.kunden.forEach(kunde => {
            kunden.push(JSON.parse(kunde));
        });
        return kunden;
    }

    addKunde(kunde: Interessent): Angebot {
        this.kunden.push(JSON.stringify(kunde));
        return this;
    }

    deleteKunde(kunde: Interessent): Angebot {
        this.kunden = this.kunden.filter(e => JSON.parse(e).userId !== kunde.userId && JSON.parse(e).objectId !== kunde.objectId);
        return this;
    }
}

export class Interessent {
    userId: string;
    objectId: string;
}
