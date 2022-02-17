import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Constants } from '../config/constants';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  apiUrl = Constants.API_GALLERY_ENDPOINT;

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
