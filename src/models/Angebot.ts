import {Anfrage} from './Anfrage';

export class Angebot extends Anfrage {
    kunden: string[] = [];
    interessenten: string[] = [];
    fahrzeugId: string;

    getInteressenten(): InteressentA[] {
        const interessenten: InteressentA[] = [];
        this.interessenten.forEach(interessent => {
            interessenten.push(JSON.parse(interessent));
        });
        return interessenten;
    }

    addInteressent(interessent: InteressentA): Angebot {
        this.interessenten.push(JSON.stringify(interessent));
        return this;
    }

    deleteInteressent(interessent: InteressentA): Angebot {
        this.interessenten = this.interessenten.filter(e => {
            return JSON.parse(e).userId !== interessent.userId && JSON.parse(e).objectId !== interessent.objectId;
        });
        return this;
    }

    getKunden(): InteressentA[] {
        const kunden: InteressentA[] = [];
        this.kunden.forEach(kunde => {
            kunden.push(JSON.parse(kunde));
        });
        return kunden;
    }

    addKunde(kunde: InteressentA): Angebot {
        this.kunden.push(JSON.stringify(kunde));
        return this;
    }

    deleteKunde(kunde: InteressentA): Angebot {
        this.kunden = this.kunden.filter(e => JSON.parse(e).userId !== kunde.userId && JSON.parse(e).objectId !== kunde.objectId);
        return this;
    }
}

export class InteressentA {
    userId: string;
    objectId: string;
}
