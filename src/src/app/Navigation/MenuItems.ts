import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ConfigService } from "../Services/config.service";

export const MenuItems: (MenuItem | MenuItemDivider)[] = [
  {
    type: 'page',
    name: 'Dashboard',
    icon: 'fas fa-home',
    route: '/',
    routerLinkActiveOptions: { exact: true },
  },
  {
    type: 'page',
    name: 'Accounts',
    icon: 'fas fa-user',
    route: '/accounts',
  },
  {
    type: 'page',
    name: 'Transactions',
    icon: 'fas fa-money-check-alt',
    route: '/transactions',
  },
  // {
  //   name: 'Budgets',
  //   icon: 'fas fa-funnel-dollar',
  //   route: '/budgets',
  //   matTooltip: 'Future Feature to be Implemented',
  // },
  {
    type: 'page',
    name: 'Goals',
    icon: 'fas fa-balance-scale',
    route: '/goals',
  },
  {
    type: 'divider',
  },
  {
    type: 'page',
    name: 'Portfolio',
    icon : 'fas fa-chart-pie',
    route: '/wealth/portfolio',
    show: (c) => c.getClientValue('enable_wealth').pipe(map(v => v !== 'false')),
  },
  {
    type: 'page',
    name: 'Assets',
    icon: 'fas fa-coins',
    route: '/wealth/assets',
    show: (c) => c.getClientValue('enable_wealth').pipe(map(v => v !== 'false')),
  },
  {
    type: 'page',
    name: 'Trades',
    icon: 'fas fa-receipt',
    route: '/wealth/trades',
    show: (c) => c.getClientValue('enable_wealth').pipe(map(v => v !== 'false')),
  },
  // {
  //   type: 'page',
  //   name: 'Performance',
  //   icon: 'fas fa-chart-line',
  //   route: '/wealth/performance',
  // },
  {
    type: 'divider'
  },
  {
    type: 'page',
    name: 'Datafeeds',
    icon: 'fas fa-rss',
    route: '/datafeeds',
  },
];

interface MenuItem {
  name: string;
  type: 'page';
  icon: string;
  route: string;
  routerLinkActiveOptions?: { exact: boolean };
  matTooltip?: string;
  show?: (c: ConfigService) => Observable<boolean>;
}

interface MenuItemDivider {
  type: 'divider';
}

