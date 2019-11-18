import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { ILanguage } from '../models/i-language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends BaseService {

  private languagesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private languages: ILanguage[] = [];
  languagesObservable: Observable<any[]> = this.languagesSubject.asObservable();

  constructor(private translateService: TranslateService) {
    super();
    this.load();
  }

  private load(): void {
    this.translateService.get('language').subscribe(data => {
      if(data){
        this.languages.push(data.en);
        this.languages.push(data.pt);
        this.languages.push(data.fr);
        this.languages.push(data.es);
        this.languagesSubject.next(this.languages);
      }
    });

  }

}
