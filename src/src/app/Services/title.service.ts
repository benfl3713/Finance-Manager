import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private configService: ConfigService) {
    this.configService.getValue('SiteName').then((name) => {
      this.baseSiteName = name || 'Finance Manager';
      this.setDocumentTitle();
    });
  }

  baseSiteName = '';
  public title: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public showBackButton: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(true);

  public setTitle(title: string) {
    this.title.next(title);
    this.setDocumentTitle();
  }

  public getTitle() {
    return this.title.value;
  }

  public resetTitle() {
    this.title.next(null);
  }

  private setDocumentTitle() {
    if (this.getTitle() && this.getTitle().length > 0) {
      document.title = `${this.getTitle()} - ${this.baseSiteName}`;
    } else {
      document.title = this.baseSiteName;
    }
  }
}
