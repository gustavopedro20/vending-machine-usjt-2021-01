import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendingMachineRoutingModule } from './vending-machine-routing.module';
import { VendingMachineComponent } from './vending-machine.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [VendingMachineComponent],
  imports: [
    CommonModule,
    VendingMachineRoutingModule,
    SharedModule
  ]
})
export class VendingMachineModule { }
