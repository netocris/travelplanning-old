import { Component } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent extends BaseComponent {

  constructor() {
    super();
  }

}
