import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  async getValue(key: string) {
    const config = await this.http
      .get<any>('assets/config.json')
      .toPromise()
      .catch(() => null);

    return config[key];
  }
}
