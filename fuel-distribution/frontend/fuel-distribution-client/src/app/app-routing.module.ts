import { OrdersComponent } from './components/pages/orders/orders.component';
import { OrderStatusComponent } from './components/pages/order-status/order-status.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { NewOrderComponent } from './components/pages/new-order/new-order.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    children: [
      {
        path: 'new-order',
        component: NewOrderComponent,
        outlet: 'dashboard',
      },
      {
        path: 'order-status',
        component: OrderStatusComponent,
        outlet: 'dashboard',
      },
      {
        path: 'orders',
        component: OrdersComponent,
        outlet: 'dashboard',
      },
    ],
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
