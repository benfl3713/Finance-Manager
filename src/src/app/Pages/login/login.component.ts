import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { FinanceApiRequest } from 'src/app/Services/finance-api.request.service';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/Services/config.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private config: ConfigService
  ) {}

  loadingBar: boolean = false;
  error: string;
  isDemo = this.config.getValue('IsDemo');

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {}

  login(): void {
    this.error = null;
    this.loginForm.disable();
    this.loadingBar = true;

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.login(username, password).subscribe({
      next: (token) => {
        if (token) {
          FinanceApiRequest.setToken(token);
          this.router.navigate(['']);
        }
        this.error = 'Username or Password Invalid';
      },
      complete: () => {
        this.loginForm.enable();
        this.loadingBar = false;
      },
    });
  }
}
