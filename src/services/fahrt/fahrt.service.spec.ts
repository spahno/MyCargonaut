import { TestBed } from '@angular/core/testing';

import { FahrtService } from './fahrt.service';

describe('FahrtService', () => {
  let service: FahrtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FahrtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
