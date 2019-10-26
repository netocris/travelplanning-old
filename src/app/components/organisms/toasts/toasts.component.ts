import { Component, TemplateRef } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css']
})
export class ToastsComponent extends BaseComponent {

  constructor(public toastService: ToastService) {
    super();
  }

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

}
