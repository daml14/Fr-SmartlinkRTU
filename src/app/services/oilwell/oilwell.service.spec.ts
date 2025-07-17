import { TestBed } from '@angular/core/testing';

import { OilwellService } from './oilwell.service';

describe('OilwellService', () => {
  let service: OilwellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OilwellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
