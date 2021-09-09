import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLinear = true;
  loginForm = {};
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  type: 'login' | 'signup' | 'reset' = 'signup';
  loading = false;

  serverMessage: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []],
    });

    this.secondFormGroup = this.fb.group({
      name: ['', Validators.required],
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

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.firstFormGroup.get('email');
  }
  get password() {
    return this.firstFormGroup.get('password');
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

  // get userDetails(){
  //   return this.authService.getUserProfile()
  // }

  async onRegister() {
    this.authService.signUp(this.loginForm).subscribe((res) => {
      this.firstFormGroup.reset();
      this.type = 'login';
    });
  }

  form1() {
    // console.log(this.firstFormGroup.value);
    this.loginForm = this.firstFormGroup.value;
  }

  form2() {
    // console.log(this.secondFormGroup.value);
  }

  onLogin() {
    this.authService.signIn(this.firstFormGroup.value);
  }

  // async onSubmit() {
  //   this.loading = true;

  //   const email = this.email.value;
  //   const password = this.password.value;

  //   try {
  //     if (this.isLogin) {
  //       await this.afAuth.signInWithEmailAndPassword(email, password);
  //     }
  //     if (this.isSignup) {
  //       await this.afAuth.createUserWithEmailAndPassword(email, password);
  //     }
  //     if (this.isPasswordReset) {
  //       await this.afAuth.sendPasswordResetEmail(email);
  //       this.serverMessage = 'Check your email';
  //     }
  //   } catch (err) {
  //     this.serverMessage = err;
  //   }

  //   this.loading = false;
  // }
}
