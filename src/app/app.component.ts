import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from './services/config.service';
import { LocaleEnum } from './enum/locale.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'travelplanning';

  constructor(private translateService: TranslateService, private configService: ConfigService){    
    this.translateService.setDefaultLang(this.configService.getStringKey(LocaleEnum.LOCALE));    
    this.translateService.use(this.configService.getStringKey(LocaleEnum.LOCALE));
  }
  
}
