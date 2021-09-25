import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BarcodeReaderService } from 'src/app/services/barcode-reader.service';

@Component({
  selector: 'app-product-info-viewer',
  templateUrl: './product-info-viewer.component.html',
  styleUrls: ['./product-info-viewer.component.scss'],
})
export class ProductInfoViewerComponent implements OnInit {

  constructor(public barcodeReaderService: BarcodeReaderService) { }

  ngOnInit() {}

}
