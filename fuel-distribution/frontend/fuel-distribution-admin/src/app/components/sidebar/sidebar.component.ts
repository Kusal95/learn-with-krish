import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faTruckArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faGasPump } from '@fortawesome/free-solid-svg-icons';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  title: string = 'Fuel Distribution';
  @Input() isExpanded: boolean = true;
  faHouse = faHouse;
  faGasPump = faGasPump;
  faWarehouse = faWarehouse;
  faTruckArrowRight = faTruckArrowRight;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  handleSidebarToggle = () => {
    this.isExpanded ? (this.title = '') : (this.title = 'Fuel Distribution');
    this.toggleSidebar.emit(!this.isExpanded);
  };
}
