import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-alert-dismiss',
  templateUrl: './alert-dismiss.component.html',
  styleUrls: ['./alert-dismiss.component.css']
})
export class AlertDismissComponent extends BaseComponent {

  @Input()
  heading: string = '';

  @Input()
  class: string = '';

  constructor() {
    super();
  }

}
