import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { FinanceApiRequest } from './finance-api.request.service';
import { DatePipe } from '@angular/common';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  lastChecked: Date;
  newNotificationReceived: Subject<Notification[]> = new Subject();
  private _triggerUnreadCountRefresh: Subject<void> = new Subject();

  constructor(
    private financeApi: FinanceApiRequest,
    private datePipe: DatePipe,
    private notifier: NotifierService
  ) {}

  getNotifications(): Observable<Notification[]> {
    return this.financeApi.get<Notification[]>('notification');
  }

  updateNotificationReadStatus(
    notificationId: string,
    isRead: boolean
  ): Observable<boolean> {
    return this.financeApi
      .put(`notification/${notificationId}/UpdateReadStatus`, null, {
        isRead,
      })
      .pipe(catchError(() => of(false)))
      .pipe(map(() => true));
  }

  deleteNotification(notificationId: string): Observable<boolean> {
    return this.financeApi
      .delete(`notification/${notificationId}`)
      .pipe(catchError(() => of(false)))
      .pipe(map(() => true));
  }

  getUnreadNotificationCount(): Observable<NotificationCountResponse> {
    return this.financeApi
      .get<NotificationCountResponse>(
        'notification/GetUnreadNotificationCount',
        {
          lastChecked: this.datePipe.transform(
            (this.lastChecked ?? new Date()).toUTCString(),
            'yyyy-MM-ddTHH:mm:ss'
          ),
        }
      )
      .pipe(tap(() => (this.lastChecked = new Date())))
      .pipe(
        tap((response) => {
          if (
            response?.NewNotifications &&
            response.NewNotifications.length > 0
          ) {
            this.newNotificationReceived.next(response.NewNotifications);
            response.NewNotifications.forEach((not) =>
              this.notifier.notify(
                not.NotificationType.toLowerCase(),
                not.Message,
                not.ID
              )
            );
          }
        })
      );
  }

  getUnreadPoll(): Observable<number> {
    return new Observable<number>((obs) => {
      // Get first value
      this.getUnreadNotificationCount().subscribe({
        next: (result) => obs.next(result.Count),
      });

      // Get new value every 15 seconds
      setInterval(() => {
        this.getUnreadNotificationCount().subscribe({
          next: (result) => {
            obs.next(result.Count);
          },
        });
      }, 15000);

      // Allow for manual refresh
      this._triggerUnreadCountRefresh.subscribe(() => {
        this.getUnreadNotificationCount().subscribe({
          next: (result) => obs.next(result.Count),
        });
      });
    }).pipe(shareReplay(1));
  }

  triggerUnreadRefresh(): void {
    this._triggerUnreadCountRefresh.next();
  }
}

export interface Notification {
  ID: string;
  Message: string;
  NotificationType: 'Info' | 'Warning' | 'Error';
  Details: any;
  MarkedAsRead: boolean;
  DateCreated: Date;
}

export interface NotificationCountResponse {
  Count: number;
  NewNotifications?: Notification[];
}
