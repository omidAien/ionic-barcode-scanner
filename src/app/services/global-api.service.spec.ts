import { TestBed } from '@angular/core/testing';

import { GlobalAPIService } from './global-api.service';

describe('GlobalAPIService', () => {
  let service: GlobalAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
