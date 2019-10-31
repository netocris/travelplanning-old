import { Component, Input, Output, EventEmitter, Inject, LOCALE_ID } from '@angular/core';
import { IRecord } from '../../../models/i-record';
import { BaseComponent } from '../../base.component';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends BaseComponent {

  private languageSubscription: Subscription = null;

  year: number = 1800;
  langs = [];

  constructor(@Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) protected lang: string,
    private translateService: TranslateService,
    private languageService: LanguageService) {
    super();
  }

  protected ngOnInitCustom(): void {
    this.year = new Date().getFullYear();
    if (this.isEmptyObject(this.languageSubscription)) {
      this.languageSubscription = this.languageService.langsObservable.subscribe((data: any[]) => {
        if (data) {
          this.langs = data;
        }
      });
    }
  }

  protected ngOnDestroyCustom(): void {
    if (!this.isEmptyObject(this.languageSubscription)) {
      this.languageSubscription.unsubscribe();
    }
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
    this.translateService.use(language);
  }

  private trans(): void {
    this.document.documentElement.classList.add('transition');
      window.setTimeout(() => {
        this.document.documentElement.classList.remove('transition');
      }, this.timeout);
  }

}
