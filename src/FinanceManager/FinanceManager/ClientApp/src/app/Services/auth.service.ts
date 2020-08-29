import { Injectable } from '@angular/core';
import { FinanceApiRequest } from './finance-api.request.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    const body = {
      username,
      password,
    };

    return this.http
      .post<string>(`${FinanceApiRequest.BASE_URL}auth/authenticate`, body)
      .pipe(catchError(() => of(null)));
  }

  register(formValues: any): Observable<string> {
    return this.http
      .post<string>(`${FinanceApiRequest.BASE_URL}client`, formValues)
      .pipe(catchError(() => of(null)));
  }
}
