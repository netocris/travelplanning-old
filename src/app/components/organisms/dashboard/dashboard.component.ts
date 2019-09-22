import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
  }

  protected ngOnInitCustom(): void {    
    this.stillLoading = true;
    setTimeout(() => {
      console.log('do nothing for now ...')
    }, this.timeout); 
  }

}
