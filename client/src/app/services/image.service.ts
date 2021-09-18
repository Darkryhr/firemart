import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Gallery } from '../models/gallery';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  apiUrl = 'http://localhost:3000/gallery';
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  postImage(file) {
    const formData: FormData = new FormData();
    formData.append('filekey', file, file.name);
  }
}
