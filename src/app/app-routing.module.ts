import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'menu'
  },
  {
    path: 'vending-machine',
    loadChildren: () => import('./vending-machine/vending-machine.module').then(m => m.VendingMachineModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)
  },
  {
    path: 'elevator',
    loadChildren: () => import('./elevator/elevator.module').then(m => m.ElevatorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
