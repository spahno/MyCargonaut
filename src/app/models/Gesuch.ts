import {Anfrage} from './Anfrage';

export class Gesuch extends Anfrage {
    fahrerId: Map<string, string>;
    interessenten: Map<string, string>;
    lieferobjektId: string;
}
