import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendingMachineComponent } from './vending-machine.component';

const routes: Routes = [{ path: '', component: VendingMachineComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendingMachineRoutingModule { }
