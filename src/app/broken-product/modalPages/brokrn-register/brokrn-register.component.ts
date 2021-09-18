import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-brokrn-register',
  templateUrl: './brokrn-register.component.html',
  styleUrls: ['./brokrn-register.component.scss'],
})
export class BrokrnRegisterComponent implements OnInit {

  @Input() title: string;

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
