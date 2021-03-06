import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Constants } from '../config/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = Constants.API_USER_ENDPOINT;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  currentUser: User = {};

  myData$: Observable<boolean>;

  cities = [
    'Jerusalem',
    'Tel Aviv',
    'Haifa',
    'Ashdod',
    'Rishon LeZiyon',
    'Petah Tikva',
    'BeerSheba',
    'Netanya',
    'Holon',
    'Bnei Brak',
  ].sort((a, b) => (a == b ? 0 : a < b ? -1 : 1));

  private dataSubject: Subject<boolean>;

  constructor(private http: HttpClient, public router: Router) {
    this.dataSubject = new Subject<boolean>();
    this.myData$ = this.dataSubject.asObservable();
  }

  // Sign-up
  signUp(user): Observable<any> {
    let api = `${this.endpoint}signup`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user) {
    return this.http
      .post<any>(`${this.endpoint}login`, user)
      .pipe(catchError(this.handleError));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return authToken !== null ? true : false;
  }

  getRole() {
    let role = localStorage.getItem('role');
    return role;
  }

  // Logout
  doLogout() {
    let removeToken = localStorage.removeItem('token');
    localStorage.removeItem('role');
    if (removeToken == null) {
      this.dataSubject.next(false);
      this.router.navigate(['/']);
    }
  }

  // User profile
  getUserProfile(): Observable<any> {
    let api = `${this.endpoint}profile/`;
    return this.http.get<any>(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      tap((res) => {
        this.currentUser = res.data.user;
        this.dataSubject.next(true);
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    msg = error.error.message;

    return throwError({ errorMessage: msg, statusCode: error.status });
  }
}
