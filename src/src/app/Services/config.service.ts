import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}

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
}
