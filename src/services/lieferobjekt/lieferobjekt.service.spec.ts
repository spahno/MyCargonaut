import { TestBed } from '@angular/core/testing';

import { LieferobjektService } from './lieferobjekt.service';

describe('LieferobjektService', () => {
  let service: LieferobjektService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LieferobjektService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
