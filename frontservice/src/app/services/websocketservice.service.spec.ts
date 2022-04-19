import { TestBed } from '@angular/core/testing';

import { WebsocketserviceService } from './websocketservice.service';

describe('WebsocketserviceService', () => {
  let service: WebsocketserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
