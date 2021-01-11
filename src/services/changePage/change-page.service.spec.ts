import { TestBed } from '@angular/core/testing';

import { ChangePageService } from './change-page.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('ChangePageService', () => {
  let service: ChangePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(ChangePageService);
  });

  /*it('should be created', () => {
    expect(service).toBeTruthy();
  });*/
});
