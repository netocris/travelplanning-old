import { Component } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent {

  records: any = [];

  constructor() {
    super();
   }

  protected ngOnInitCustom(): void {    
    this.stillLoading = true;
    setTimeout(() => {
      this.stillLoading = false;
    }, this.timeout); 
  }

  save(): void {
    
  }

}
