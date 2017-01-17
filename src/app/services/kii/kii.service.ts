import { AppConfig } from './../../app.config';
import { Injectable } from '@angular/core';

@Injectable()
export class KiiService {

  constructor() {
    Kii.initializeWithSite(AppConfig.AppID, AppConfig.AppKey, AppConfig.KiiSite);
  }

}
