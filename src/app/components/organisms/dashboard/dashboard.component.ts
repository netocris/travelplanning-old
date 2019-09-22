import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent {

  constructor() {
    super();
   }

  protected ngOnInitCustom(): void {    
    this.stillLoading = true;
    setTimeout(() => {
      this.stillLoading = false;
    }, this.timeout); 
  }

}
