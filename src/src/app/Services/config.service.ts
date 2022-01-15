import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  observers: any = {};

  private config;

  async getValue(key: string): Promise<any> {
    if (!this.config) {
      this.config = await this.http
        .get<any>('assets/config.json')
        .toPromise()
        .catch(() => null);
    }

    return this.config[key];
  }

  getClientValue(key: string): BehaviorSubject<string> {
    const obs = new BehaviorSubject<string>(localStorage.getItem(key))

    if(!this.observers[key]){
      this.observers[key] = [];
    }

    this.observers[key].push(obs);
    return obs;
  }

  setClientValue(key: string, value: string) {
    localStorage.setItem(key, value);

    if(this.observers[key] && this.observers[key].length > 0){
      this.observers[key].forEach(o => o.next(value));
    }
  }
}
