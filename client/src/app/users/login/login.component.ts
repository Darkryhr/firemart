import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { SnackService } from 'src/app/services/snack.service';
import { throwError } from 'rxjs';

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
  cities: string[];
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
      password: ['', [Validators.minLength(8), Validators.required]],
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

    this.cities = this.authService.cities;
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
  get street() {
    return this.secondFormGroup.get('street');
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
    this.authService
      .signUp(customerDetails)
      .pipe(catchError((error) => this.handleError(error)))
      .subscribe({
        next: (res) => {
          this.firstFormGroup.reset();
          this.type = 'login';
          this.snack.onRegister();
        },
        error: (res) => {
          this.serverMessage = res;
        },
      });
  }

  form1() {
    this.loginForm = this.firstFormGroup.value;
  }

  form2() {
    this.registerForm = this.secondFormGroup.value;
  }

  onLogin() {
    this.authService
      .signIn(this.firstFormGroup.value)
      .pipe(catchError((error) => this.handleError(error)))
      .subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        this.authService.getUserProfile().subscribe((res) => {
          if (res.data.user.role === 'user') {
            localStorage.setItem('role', 'user');
            this.router.navigate(['products']);
          } else if (res.data.user.role === 'admin') {
            localStorage.setItem('role', 'admin');
            this.router.navigate(['admin']);
          }
        });
      });
  }

  handleError(error) {
    let msg = '';
    msg = error.errorMessage;
    if (error.statusCode !== 401) return throwError(error);
    this.snack.onSignInError(msg);
    return throwError(error);
  }
}
