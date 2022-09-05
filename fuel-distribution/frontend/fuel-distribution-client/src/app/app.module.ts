import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { StompService } from './services/stomp.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewOrderComponent } from './components/pages/new-order/new-order.component';
import { OrderStatusComponent } from './components/pages/order-status/order-status.component';
import { ClipboardModule } from 'ngx-clipboard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { DatepipeComponent } from './components/datepipe/datepipe.component';
import { StatusComponent } from './components/status/status.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    NewOrderComponent,
    OrderStatusComponent,
    NavbarComponent,
    OrdersComponent,
    DatepipeComponent,
    StatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ClipboardModule,
  ],
  providers: [StompService],
  bootstrap: [AppComponent],
})
export class AppModule {}
