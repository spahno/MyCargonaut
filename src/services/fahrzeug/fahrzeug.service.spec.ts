import { TestBed } from '@angular/core/testing';

import { FahrzeugService } from './fahrzeug.service';

describe('FahrzeugService', () => {
  let service: FahrzeugService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FahrzeugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
