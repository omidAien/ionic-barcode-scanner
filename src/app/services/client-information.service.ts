import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ClientInformation } from '../general-models/general';

@Injectable({
  providedIn: 'root'
})
export class ClientInformationService {

  constructor(private deviceService: DeviceDetectorService, 
              private cookieService: CookieService) {

    this.getDeviceInfo();            

  }

  getDeviceInfo() {

    const clientDeviceInformation: ClientInformation = {
      browser: this.deviceService.browser,
      browserVersion : this.deviceService.browser_version,
      device : this.deviceService.device,
      deviceType : this.deviceService.deviceType,
      orientation : this.deviceService.orientation,
      os : this.deviceService.os,
      osVersion : this.deviceService.os_version,
      ip : "",
      mac: "",
      agent : this.deviceService.userAgent,
      longitude: 0,
      latitude: 0
    };

    this.cookieService.set("clientInformation", JSON.stringify(clientDeviceInformation));

  }            
}
