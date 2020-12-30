import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FahrzeugService {

  constructor() { }

  getFahrzeugById(id: string): any {
    return null;
  }

  addFahrzeug(fahrzeug: any): Promise<any> {
    return null;
  }
}
