import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { FinanceApiRequest } from 'src/app/Services/finance-api.request.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifier: NotifierService
  ) {}

  loadingBar: boolean = false;
  error: string;

  registerForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {}

  register() {
    this.registerForm.disable();
    this.loadingBar = true;
    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      this.error = 'Passwords do not Match';
    }

    const body = {
      FirstName: this.registerForm.value.firstName,
      LastName: this.registerForm.value.lastName,
      Username: this.registerForm.value.username,
      Password: this.registerForm.value.password,
    };

    this.authService.register(body).subscribe({
      next: (clientId) => {
        if (clientId) {
          this.notifier.notify('success', 'Registered successfully');
          this.router.navigate(['login']);
        }
        this.error = 'Failed to Register';
        this.registerForm.enable();
        this.loadingBar = false;
      },
      error: (ex) => this.processRegisterError(ex),
      complete: () => {
        this.registerForm.enable();
        this.loadingBar = false;
      },
    });
  }

  processRegisterError(ex) {
    console.log(ex);
    this.notifier.notify('error', ex.error.error || 'Something went Wrong');
    this.registerForm.enable();
    this.loadingBar = false;
  }
}
