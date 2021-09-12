import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackService } from 'src/app/services/snack.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLinear = true;
  loginForm = {};
  registerForm = {};
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  type: 'login' | 'signup' = 'signup';
  loading = false;

  serverMessage: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snack: SnackService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []],
    });

    this.secondFormGroup = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      city: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  changeType(val) {
    this.type = val;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get email() {
    return this.firstFormGroup.get('email');
  }
  get password() {
    return this.firstFormGroup.get('password');
  }
  get name() {
    return this.secondFormGroup.get('name');
  }

  get passwordConfirm() {
    return this.firstFormGroup.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

  async onRegister() {
    let customerDetails = { ...this.loginForm, ...this.registerForm };
    this.authService.signUp(customerDetails).subscribe((res) => {
      this.firstFormGroup.reset();
      this.type = 'login';
      this.snack.onRegister();
    });
  }

  form1() {
    this.loginForm = this.firstFormGroup.value;
  }

  form2() {
    this.registerForm = this.secondFormGroup.value;
  }

  onLogin() {
    this.authService.signIn(this.firstFormGroup.value);
  }
}
