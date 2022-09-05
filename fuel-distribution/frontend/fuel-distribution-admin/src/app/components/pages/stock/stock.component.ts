import { NotifyService } from './../../../services/notify.service';
import { StockService } from './../../../services/stock.service';
import { Stock } from './../../../model/stock';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  fuelType: string = '';
  quantity!: number;
  stocks: Stock[] = [];

  constructor(
    private stockService: StockService,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this.loadStock();
  }

  loadStock() {
    this.stockService.getAllStocks().subscribe((stocks) => {
      this.stocks = stocks;
    });
  }

  onSubmit() {
    if (this.fuelType === '') {
      alert('Please select fuel type');
      return;
    }
    if (!this.quantity) {
      alert('Please add fuel quantity');
      return;
    }

    const newStock: Stock = {
      stockQuantity: this.quantity,
      fuelType: this.fuelType,
    };

    this.notifyService.confirm(
      'Confirm',
      'Do you want to update the stock',
      () => {
        this.stockService.updateStock(newStock).subscribe((stock) => {
          this.notifyService.notifySuccess('stock successfully updated');

          this.loadStock();
          this.fuelType = '';
          this.quantity = 0;
        });
      }
    );
  }
}
