import { TestBed } from '@angular/core/testing';

import { BarcodeNotValidService } from './barcode-not-valid.service';

describe('BarcodeNotValidService', () => {
  let service: BarcodeNotValidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarcodeNotValidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
