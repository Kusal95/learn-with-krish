import { Component, Input, OnInit } from '@angular/core';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  faHourglassHalf = faHourglassHalf;
  faCircleCheck = faCircleCheck;
  faCircleExclamation = faCircleExclamation;

  @Input() orderStatus!: string;

  constructor() {}

  ngOnInit(): void {
    console.log(this.orderStatus);
  }
}
