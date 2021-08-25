import { TestBed } from '@angular/core/testing';

import { ClientInformationService } from './client-information.service';

describe('ClientInformationService', () => {
  let service: ClientInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
