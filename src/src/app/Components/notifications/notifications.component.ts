import {
  Notification,
  NotificationService,
} from '../../Services/notification.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, zip } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Component({
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  selector: 'app-notification-panel',
})
export class NotificationsComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private notificationService: NotificationService,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {
    this.refreshNotifications();
    this.notificationService.newNotificationReceived
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.refreshNotifications();
      });
  }

  notifications$;

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  refreshNotifications(): void {
    this.notifications$ = this.notificationService.getNotifications();
  }

  updateNotificationReadStatus(notificationId: string, isRead: boolean): void {
    this.notificationService
      .updateNotificationReadStatus(notificationId, isRead)
      .subscribe((result) => {
        if (result === false) {
          this.notifier.notify(
            'error',
            `Failed to mark notification as ${isRead ? 'read' : 'unread'}`
          );
        }
        this.refreshNotifications();
        this.notificationService.triggerUnreadRefresh();
      });
  }

  markMultipleAsRead(notifications: Notification[]): void {
    zip(
      ...notifications
        .filter((n) => n.MarkedAsRead === false)
        .map((n) =>
          this.notificationService.updateNotificationReadStatus(n.ID, true)
        )
    ).subscribe({
      next: (result) => {
        if (!result.every((n) => n === true)) {
          this.notifier.notify(
            'error',
            'Failed to mark some notifications as read'
          );
        }

        this.refreshNotifications();
        this.notificationService.triggerUnreadRefresh();
      },
    });
  }

  deleteNotification(notificationId: string): void {
    if (
      confirm('Are you sure you want to delete this notification') === false
    ) {
      return;
    }

    this.notificationService
      .deleteNotification(notificationId)
      .subscribe((result) => {
        if (result === false) {
          this.notifier.notify('error', 'Failed to delete notification');
        }
        this.refreshNotifications();
        this.notificationService.triggerUnreadRefresh();
      });
  }

  deleteMultipleNotifications(notifications: Notification[]): void {
    if (
      confirm('Are you sure you want to delete ALL notifications') === false
    ) {
      return;
    }

    zip(
      ...notifications.map((n) =>
        this.notificationService.deleteNotification(n.ID)
      )
    ).subscribe((result) => {
      if (!result.every((n) => n === true)) {
        this.notifier.notify('error', 'Failed to delete some notifications');
      }

      this.refreshNotifications();
      this.notificationService.triggerUnreadRefresh();
    });
  }
}
