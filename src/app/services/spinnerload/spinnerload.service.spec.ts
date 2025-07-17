import { TestBed } from '@angular/core/testing';

import { SpinnerloadService } from './spinnerload.service';

describe('SpinnerloadService', () => {
  let service: SpinnerloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
