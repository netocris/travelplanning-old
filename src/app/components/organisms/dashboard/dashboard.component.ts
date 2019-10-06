import { Component } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { FirebaseService } from '../../../services/firebase.service';
import { Record } from '../../../models/record';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent {

  records: {};

  constructor(private fbService: FirebaseService) {
    super();
   }

  protected ngOnInitCustom(): void {    
    this.stillLoading = true;
    setTimeout(() => {
      this.fbService.getRecords().subscribe((data: Record) => {
        if (data) {
          this.records = data;
          this.stillLoading = false;
        }
      });
    }, this.timeout); 
  }

  editorOutputEvent(data: any): void {
    this.fbService.save(data);
  }

  save(): void {
    
  }

}
