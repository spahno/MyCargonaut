import {Anfrage} from './Anfrage';

export class Angebot extends Anfrage {
    kunden: Map<string, string>;
    interessenten: Map<string, string>;
    fahrzeugId: string;
}
