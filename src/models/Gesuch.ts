import {Anfrage} from './Anfrage';

export class Gesuch extends Anfrage {
    fahrer: string[] = [];
    interessenten: string[] = [];
    lieferobjektId: string;

    getInteressenten(): InteressentG[] {
        const interessenten: InteressentG[] = [];
        this.interessenten.forEach(interessent => {
            interessenten.push(JSON.parse(interessent));
        });
        return interessenten;
    }

    addInteressent(interessent: InteressentG): Gesuch {
        this.interessenten.push(JSON.stringify(interessent));
        return this;
    }

    deleteInteressent(interessent: InteressentG): Gesuch {
        this.interessenten = this.interessenten.filter(e => {
            return JSON.parse(e).userId !== interessent.userId && JSON.parse(e).objectId !== interessent.fahrzeugId;
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
            if (i + 1 === interessenten.length) {
                return contains;
            }
        }
    }

    getFahrer(): InteressentG[] {
        const fahrer: InteressentG[] = [];
        this.fahrer.forEach(e => {
            fahrer.push(JSON.parse(e));
        });
        return fahrer;
    }

    addFahrer(fahrer: InteressentG): Gesuch {
        this.fahrer.push(JSON.stringify(fahrer));
        return this;
    }

    deleteFahrer(fahrer: InteressentG): Gesuch {
        this.fahrer = this.fahrer.filter(e => JSON.parse(e).userId !== fahrer.userId && JSON.parse(e).objectId !== fahrer.fahrzeugId);
        return this;
    }

    /**
     * This Method checks if the User is in the Interest Array
     * @param userId is the user that will be checked
     */
    isFahrer(userId: string): boolean {
        let contains = false;
        const fahrer = this.getFahrer();
        for (let i = 0; i < fahrer.length; i++) {
            contains = fahrer[i].userId === userId;
            if (fahrer[i].userId === userId && i + 1 === fahrer.length) {
                return contains;
            }
        }
    }
}

export class InteressentG {
    userId: string;
    fahrzeugId: string;
}
