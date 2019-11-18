import { UserSettings } from './../../../models/user-settings';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { SettingsService } from '../../../services/settings.service';
import { IUserSettings } from '../../../models/i-user-settings';
import { LanguageService } from '../../../services/language.service';
import { ILanguage } from '../../../models/i-language';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends BaseComponent {

  private languageSubscription: Subscription = null;

  year: number = 1800;
  settings: IUserSettings = null;
  languages = [];

  constructor(@Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) protected lang: string,
    private translateService: TranslateService,
    private authService: AuthService,
    private settingsService: SettingsService,
    private languageService: LanguageService) {
    super();
  }

  protected ngOnInitCustom(): void {
    this.year = new Date().getFullYear();
    this.settings = new UserSettings();
    this.authService.user.subscribe(user => {
      if (user) {
        this.settings.id = user.uid;
        this.settings.darkMode = false;
        this.settingsService.getSettings(user.uid).subscribe(data => {
          if (data) {
            this.settings = data;
          }
        });
      }
    });
    if (this.isEmptyObject(this.languageSubscription)) {
      this.languageSubscription = this.languageService.languagesObservable.subscribe((data: ILanguage[]) => {
        debugger;
        if (data) {
          this.languages = data;
        }
      });
    }
  }

  protected ngOnDestroyCustom(): void {
    if (!this.isEmptyObject(this.languageSubscription)) {
      this.languageSubscription.unsubscribe();
    }
  }

  onChangeDarkMode(value: any): void {
    if(value.target.checked){
      this.trans();
      this.document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      this.trans();
      this.document.documentElement.setAttribute('data-theme', 'light');
    }
    this.settingsService.save(this.settings.id, this.settings.language, value.target.checked);
  }

  onChangeLanguage(value: any): void {
    const language = value.target.value;
    this.settingsService.save(this.settings.id, language, this.settings.darkMode);
    this.translateService.use(language);

  }

  private trans(): void {
    this.document.documentElement.classList.add('transition');
      window.setTimeout(() => {
        this.document.documentElement.classList.remove('transition');
      }, this.timeout);
  }

}
