import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from './services/config.service';
import { LocaleEnum } from './types/locale.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'travelplanning';
  constructor(private translateService: TranslateService, configService: ConfigService){
    /* this language will be used as a fallback when a translation isn't found in the current language */
    translateService.setDefaultLang(configService.getStringKey(LocaleEnum.LOCALE));
    /* this language to use, if the language isn't available, it will use the current loader to get them */
    translateService.use(configService.getStringKey(LocaleEnum.LOCALE));
  }
}
