import { StompService } from './services/stomp.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DispatchComponent } from './components/pages/dispatch/dispatch.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { StockComponent } from './components/pages/stock/stock.component';
import { DatepipeComponent } from './components/datepipe/datepipe.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    DispatchComponent,
    NavbarComponent,
    OrdersComponent,
    StockComponent,
    DatepipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [StompService],
  bootstrap: [AppComponent],
})
export class AppModule {}
