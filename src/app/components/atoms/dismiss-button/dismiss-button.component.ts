import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-dismiss-button',
  templateUrl: './dismiss-button.component.html',
  styleUrls: ['./dismiss-button.component.css']
})
export class DismissButtonComponent extends BaseComponent {

  @Input()
  class: string = 'close';

  @Input()
  attrDataDismiss: string = 'alert';

  @Input()
  attrAriaLabel: string = '';

  @Input()
  attrAriaHidden: string = 'true';

  constructor() {
    super();
  }

}
