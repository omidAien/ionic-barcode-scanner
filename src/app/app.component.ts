import { Component } from '@angular/core';
import { ClientInformationService } from './services/client-information.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private clientInformationService: ClientInformationService, ) {}
}
