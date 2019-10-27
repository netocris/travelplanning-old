import { Injectable, TemplateRef } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService extends BaseService {

  toastSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  toastObservable: Observable<any[]> = this.toastSubject.asObservable();
  toasts: any[] = [];

  add(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
    this.toastSubject.next(this.toasts);
  }

  delete(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
    this.toastSubject.next(this.toasts);
  }

}
