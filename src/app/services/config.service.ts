import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

import { config } from '../configs/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends BaseService {

  private labels: any = null;

  constructor() { 
    super();
    this.labels = Object.assign({}, config);    
  }

  getStringKey(key: string): string {

    if (!this.isEmptyObject(this.labels) && !this.isEmptyValue(key)) {
        if (!this.isEmptyObject(this.labels[key])) {
            return this.labels[key];
        }
    }

    return 'key not found!';

  }

}
