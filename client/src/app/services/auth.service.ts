import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:3000/users';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  currentUser = {};

  myData$: Observable<boolean>;

  private dataSubject: Subject<boolean>;

  constructor(private http: HttpClient, public router: Router) {
    this.dataSubject = new Subject<boolean>();
    this.myData$ = this.dataSubject.asObservable();
  }

  // Sign-up
  signUp(user): Observable<any> {
    let api = `${this.endpoint}/signup`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user) {
    return this.http
      .post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        this.getUserProfile(res.id).subscribe((res) => {
          this.currentUser = res.data.user;
          this.dataSubject.next(true);
          this.router.navigate(['products']);
        });
      });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return authToken !== null ? true : false;
  }

  // Logout
  doLogout() {
    let removeToken = localStorage.removeItem('token');
    if (removeToken == null) {
      this.dataSubject.next(false);
      this.router.navigate(['/']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/profile/${id}`;
    return this.http.get<any>(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      //client-side error
      msg = error.error.message;
    } else {
      //server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
