import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './components/atoms/not-found/not-found.component';
import { DashboardComponent } from './components/organisms/dashboard/dashboard.component';
import { ListRecordComponent } from './components/organisms/list-record/list-record.component';
import { EditRecordComponent } from './components/organisms/edit-record/edit-record.component';
import { AddRecordComponent } from './components/organisms/add-record/add-record.component';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    redirectTo: 'dashboard' 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent 
  },
  { 
    path: 'add', 
    component: AddRecordComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'edit', 
    component: EditRecordComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'list', 
    component: ListRecordComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '**', 
    pathMatch: 'full', 
    component: NotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
