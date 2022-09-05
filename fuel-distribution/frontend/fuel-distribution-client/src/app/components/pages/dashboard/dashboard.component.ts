import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userType!: string;
  sidebarExpanded = true;

  constructor(Activatedroute: ActivatedRoute, private _router: Router) {}

  ngOnInit(): void {
    if (history.state.userType) {
      localStorage.setItem('userType', history.state.userType);
    }
    this.userType = localStorage.getItem('userType')!;
  }

  onBack(): void {
    this._router.navigate(['']);
  }
}
