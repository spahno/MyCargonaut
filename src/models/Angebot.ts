import {Anfrage} from './Anfrage';

export class Angebot extends Anfrage {
    kunden: [{'userId': string, 'objectId': string}];
    interessenten: [{'userId': string, 'objectId': string}];
    fahrzeugId: string;
}
