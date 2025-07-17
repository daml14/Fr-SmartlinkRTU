import { TestBed } from '@angular/core/testing';

import { MqttpruebaService } from './mqttprueba.service';

describe('MqttpruebaService', () => {
  let service: MqttpruebaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MqttpruebaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
