export interface AccountSettings {
  AccountID: string;
  RefreshInterval: RefreshIntervals
  GenerateAdjustments: boolean;
  NotifyAccountRefreshes: boolean;
}

export enum RefreshIntervals {
  Never = "Never",
  hourly = 'hourly',
  sixHours = 'sixHours',
  biDaily = 'biDaily',
  Daily = 'Daily',
}
