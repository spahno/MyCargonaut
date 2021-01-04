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

    /**
     * This Method checks if the User is in the Interest Array
     * @param userId is the user that will be checked
     */
    isInteressent(userId: string): boolean {
        let contains = false;
        const interessenten = this.getInteressenten();
        for (let i = 0; i < interessenten.length; i++) {
            contains = interessenten[i].userId === userId;
            if (interessenten[i].userId === userId && i + 1 === interessenten.length) {
                return contains;
            }
        }
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

    /**
     * This Method checks if the User is in the Interest Array
     * @param userId is the user that will be checked
     */
    isKunde(userId: string): boolean {
        let contains = false;
        const kunden = this.getKunden();
        for (let i = 0; i < kunden.length; i++) {
            contains = kunden[i].userId === userId;
            if (kunden[i].userId === userId && i + 1 === kunden.length) {
                return contains;
            }
        }
    }
}

export class InteressentA {
    userId: string;
    objectId: string;
}
