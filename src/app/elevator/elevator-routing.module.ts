import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElevatorComponent } from './elevator.component';

const routes: Routes = [{ path: '', component: ElevatorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElevatorRoutingModule { }
