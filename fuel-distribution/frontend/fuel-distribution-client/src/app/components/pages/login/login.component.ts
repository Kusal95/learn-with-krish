import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private _userType: string = '';

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  onClick(userType: string) {
    this._userType = userType || '';
    this._router.navigateByUrl('dashboard', {
      state: { userType: this._userType },
    });
  }
}
