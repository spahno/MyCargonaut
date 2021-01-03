import {Anfrage} from './Anfrage';

export class Gesuch extends Anfrage {
    fahrer: string[] = [];
    interessenten: string[] = [];
    lieferobjektId: string;

    getInteressenten(): Interessent[] {
        const interessenten: Interessent[] = [];
        this.interessenten.forEach(interessent => {
            interessenten.push(JSON.parse(interessent));
        });
        return interessenten;
    }

    addInteressent(interessent: Interessent): Gesuch {
        this.interessenten.push(JSON.stringify(interessent));
        return this;
    }

    deleteInteressent(interessent: Interessent): Gesuch {
        this.interessenten = this.interessenten.filter(e => {
            return JSON.parse(e).userId !== interessent.userId && JSON.parse(e).objectId !== interessent.fahrerId;
        });
        return this;
    }

    getFahrer(): Interessent[] {
        const fahrer: Interessent[] = [];
        this.fahrer.forEach(e => {
            fahrer.push(JSON.parse(e));
        });
        return fahrer;
    }

    addFahrer(fahrer: Interessent): Gesuch {
        this.fahrer.push(JSON.stringify(fahrer));
        return this;
    }

    deleteFahrer(fahrer: Interessent): Gesuch {
        this.fahrer = this.fahrer.filter(e => JSON.parse(e).userId !== fahrer.userId && JSON.parse(e).objectId !== fahrer.fahrerId);
        return this;
    }
}

export class Interessent {
    userId: string;
    fahrerId: string;
}
