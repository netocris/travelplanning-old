import { Component } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { RecordService } from '../../../services/record.service';
import { Record } from '../../../models/record';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent {
  
  constructor(private recordService: RecordService) {
    super();
  }

}
