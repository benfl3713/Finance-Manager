import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  loadingBar: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {}

  login() {
    console.log(this.loginForm.value);
    this.loginForm.disable();
    this.loadingBar = true;
    setTimeout(() => {
      this.loginForm.enable();
      this.loadingBar = false;
    }, 1000);
  }
}
