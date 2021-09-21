import { Component, Input, OnInit } from '@angular/core';
import { IonSelect, IonSelectOption, ModalController } from '@ionic/angular';
import { BarcodeReaderService } from 'src/app/services/barcode-reader.service';

@Component({
  selector: 'app-brokrn-register',
  templateUrl: './brokrn-register.component.html',
  styleUrls: ['./brokrn-register.component.scss'],
})
export class BrokrnRegisterComponent implements OnInit {

  @Input() title: string;
  @Input() barcode:string;

  responser:string = null;
  brokenReason:string = null;

  constructor(public modalController: ModalController, 
              public barcodeReaderService: BarcodeReaderService,) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });

    this.barcodeReaderService.setBarcode(null);
  }

  selectOptions(event:any, role:string) {

    switch (role) {

      case 'responser':
        this.responser = event.detail.value;
        break;

      case 'brokenReason':
        this.brokenReason = event.detail.value;
        break;

    }
  }

  isDisabled() {
    return !(this.responser && this.brokenReason);
  }

}
