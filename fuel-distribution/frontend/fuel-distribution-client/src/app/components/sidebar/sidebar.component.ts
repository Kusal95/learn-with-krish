import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { faGasPump } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  title: string = 'Fuel Distribution';
  @Input() isExpanded: boolean = true;
  @Input() userType!: string;

  userTypeGasStation: boolean = false;
  userTypeUser: boolean = false;

  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  faGasPump = faGasPump;
  faHouse = faHouse;
  faClockRotateLeft = faClockRotateLeft;

  handleSidebarToggle = () => {
    this.isExpanded ? (this.title = '') : (this.title = 'Fuel Distribution');
    this.toggleSidebar.emit(!this.isExpanded);
  };

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.userType === 'gas-station') {
      this.userTypeGasStation = !this.userTypeGasStation;
    } else if (this.userType === 'user') {
      this.userTypeUser = !this.userTypeUser;
    }
  }
}
