import { TestBed } from '@angular/core/testing';

import { BarcodeReaderService } from './barcode-reader.service';

describe('BarcodeReaderService', () => {
  let service: BarcodeReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarcodeReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
