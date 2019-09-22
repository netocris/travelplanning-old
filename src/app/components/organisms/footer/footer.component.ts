import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends BaseComponent {
  
  year: number = 1800;

  constructor() {
    super();
  }

  protected ngOnInitCustom(): void {
    this.year = new Date().getFullYear();
  }

}
