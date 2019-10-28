import { Component, Input, Output, EventEmitter, Inject, LOCALE_ID } from '@angular/core';
import { IRecord } from '../../../models/i-record';
import { BaseComponent } from '../../base.component';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends BaseComponent {

  year: number = 1800;

  langList = [ {'code': 'pt', 'label': 'PT'}, {'code': 'en', 'label': 'EN'}];

  constructor(@Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) protected lang: string,
    private translate: TranslateService) {
    super();
  }

  protected ngOnInitCustom(): void {
    this.year = new Date().getFullYear();
  }

  onChange(value: any): void {
    if(value.target.checked){
      this.trans();
      this.document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      this.trans();
      this.document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  private trans(): void {
    this.document.documentElement.classList.add('transition');
      window.setTimeout(() => {
        this.document.documentElement.classList.remove('transition');
      }, this.timeout);
  }

}
