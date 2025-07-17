import { TestBed } from '@angular/core/testing';

import { OilPricesService } from './oil-prices.service';

describe('OilPricesService', () => {
  let service: OilPricesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OilPricesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
