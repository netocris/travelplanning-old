import { Component, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css']
})
export class ToastsComponent extends BaseComponent {

  @Input()
  toasts: any[] = [];

  @Output()
  hideOutputEventEmitter = new EventEmitter();

  delay: number = 1000;

  constructor(public toastService: ToastService) {
    super();
  }

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

  hideEventEmitter(toast): void {
    this.hideOutputEventEmitter.emit(toast);
  }

}
