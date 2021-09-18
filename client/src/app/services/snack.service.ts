import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  authError() {
    this.snackBar.open('You must be logged in!', 'OK', {
      duration: 5000,
    });

    return this.snackBar._openedSnackBarRef
      .onAction()
      .pipe(tap((_) => this.router.navigate(['login'])))
      .subscribe();
  }

  adminError() {
    this.snackBar.open("You're admin credentials are invalid", 'OK', {
      duration: 5000,
    });
  }

  onRegister() {
    this.snackBar.open('Thank You!', 'Login');
  }

  onOrderComplete() {
    this.snackBar.open('Your purchase has been completed successfully', 'Ok', {
      duration: 5000,
    });
  }
}
