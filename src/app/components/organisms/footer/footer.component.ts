import { Component, Inject, LOCALE_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BaseComponent } from '../../base.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends BaseComponent {
  
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
    console.log(value.target.checked);
    if(value.target.checked){
      this.trans();
      this.document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      this.trans();
      this.document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
}

  private trans(): void {
    this.document.documentElement.classList.add('transition');
      window.setTimeout(() => {
        this.document.documentElement.classList.remove('transition');
      }, 1000);
  }

}
