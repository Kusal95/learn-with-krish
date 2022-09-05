import { StockComponent } from './components/pages/stock/stock.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { DispatchComponent } from './components/pages/dispatch/dispatch.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      //   {
      //     path: 'home',
      //     component: HomeComponent,
      //     outlet: 'dashboard',
      //   },
      {
        path: 'dispatch',
        component: DispatchComponent,
        outlet: 'dashboard',
      },
      {
        path: 'orders',
        component: OrdersComponent,
        outlet: 'dashboard',
      },
      {
        path: 'stock',
        component: StockComponent,
        outlet: 'dashboard',
      },
    ],
    component: DashboardComponent,
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
