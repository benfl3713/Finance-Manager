import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Params } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root',
})
export class FinanceApiRequest {
  constructor(private http: HttpClient) {}
  public static BASE_URL = 'http://localhost:5001/api/';
  public static get Token(): string | null {
    return localStorage.getItem('id_token');
  }

  public static setToken(token: string): void {
    if (token) {
      return localStorage.setItem('id_token', token);
    }
    return localStorage.removeItem('id_token');
  }

  public static LoadBaseUrl(http: HttpClient): () => Promise<void> {
    return async () => {
      const config = await http
        .get<any>('assets/config.json')
        .toPromise()
        .catch(() => null);
      if (config && config.FinanceApiUrl && config.FinanceApiUrl !== '') {
        FinanceApiRequest.BASE_URL = config.FinanceApiUrl;
      }

      if (!FinanceApiRequest.BASE_URL.endsWith('/')) {
        FinanceApiRequest.BASE_URL = FinanceApiRequest.BASE_URL + '/';
      }
    };
  }

  public get<T>(url: string, queryParams?: Params): Observable<T> {
    return this.http
      .get<T>(`${FinanceApiRequest.BASE_URL}${url}`, {
        params: queryParams,
        headers: this.authHeader,
      })
      .pipe(
        catchError((ex) => {
          console.log(ex);
          throw ex;
        })
      );
  }

  public post<T>(url: string, body: any, queryParams?: Params): Observable<T> {
    return this.http
      .post<T>(`${FinanceApiRequest.BASE_URL}${url}`, body, {
        params: queryParams,
        headers: this.authHeader,
      })
      .pipe(
        catchError((ex) => {
          console.log(ex);
          throw ex;
        })
      );
  }

  public put<T>(url: string, body: any, queryParams?: Params): Observable<T> {
    return this.http
      .put<T>(`${FinanceApiRequest.BASE_URL}${url}`, body, {
        params: queryParams,
        headers: this.authHeader,
      })
      .pipe(
        catchError((ex) => {
          console.log(ex);
          throw ex;
        })
      );
  }

  public delete<T>(url: string, queryParams?: Params): Observable<T> {
    return this.http
      .delete<T>(`${FinanceApiRequest.BASE_URL}${url}`, {
        params: queryParams,
        headers: this.authHeader,
      })
      .pipe(
        catchError((ex) => {
          console.log(ex);
          throw ex;
        })
      );
  }

  get authHeader(): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${FinanceApiRequest.Token}`)
      .append('Content-Type', 'application/json');
  }
}
