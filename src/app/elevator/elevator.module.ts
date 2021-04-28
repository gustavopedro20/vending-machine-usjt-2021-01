import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElevatorRoutingModule } from './elevator-routing.module';
import { ElevatorComponent } from './elevator.component';

@NgModule({
  declarations: [ElevatorComponent],
  imports: [
    CommonModule,
    ElevatorRoutingModule
  ]
})
export class ElevatorModule { }
