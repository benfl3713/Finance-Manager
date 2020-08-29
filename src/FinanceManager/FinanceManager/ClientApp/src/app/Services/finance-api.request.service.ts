import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FinanceApiRequest {
  constructor(private http: HttpClient) {}
  public static BASE_URL = 'http://localhost:5001/api/';
  public static get Token(): string {
    return localStorage.getItem('id_token');
  }

  public static setToken(token: string): void {
    if (token) {
      return localStorage.setItem('id_token', token);
    }
    return localStorage.removeItem('id_token');
  }

  public get<T>(url: string, queryParams?: Params): Observable<T> {
    return this.http.get<T>(`${FinanceApiRequest.BASE_URL}${url}`, {
      params: queryParams,
    });
  }

  public post<T>(url: string, body: any, queryParams?: Params): Observable<T> {
    return this.http.post<T>(`${FinanceApiRequest.BASE_URL}${url}`, body, {
      params: queryParams,
    });
  }

  public put<T>(url: string, body: any, queryParams?: Params): Observable<T> {
    return this.http.put<T>(`${FinanceApiRequest.BASE_URL}${url}`, body, {
      params: queryParams,
    });
  }

  public delete<T>(url: string, queryParams?: Params): Observable<T> {
    return this.http.delete<T>(`${FinanceApiRequest.BASE_URL}${url}`, {
      params: queryParams,
    });
  }
}
