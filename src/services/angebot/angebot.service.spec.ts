import { TestBed } from '@angular/core/testing';

import { AngebotService } from './angebot.service';

describe('AngebotService', () => {
  let service: AngebotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngebotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
