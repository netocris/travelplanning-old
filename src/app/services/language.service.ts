import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { ILanguage } from '../models/i-language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends BaseService {

  private langsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private langs: ILanguage[] = [];
  langsObservable: Observable<any[]> = this.langsSubject.asObservable();

  constructor(private translateService: TranslateService) {
    super();
    this.load();
  }

  private load(): void {
    this.translateService.get('language').subscribe(data => {
      if(data){
        this.langs.push(data.en);
        this.langs.push(data.pt);
        this.langs.push(data.fr);
        this.langs.push(data.es);
        this.langsSubject.next(this.langs);
      }
    });

  }

}
