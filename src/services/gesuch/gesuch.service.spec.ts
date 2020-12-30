import { TestBed } from '@angular/core/testing';

import { GesuchService } from './gesuch.service';

describe('GesuchService', () => {
  let service: GesuchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GesuchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
