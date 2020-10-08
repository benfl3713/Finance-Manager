export const MenuItems = [
  {
    name: 'Dashboard',
    icon: 'fas fa-home',
    route: '/',
    routerLinkActiveOptions: { exact: true },
  },
  {
    name: 'Accounts',
    icon: 'fas fa-user',
    route: '/accounts',
  },
  {
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
    name: 'Datafeeds',
    icon: 'fas fa-rss',
    route: '/datafeeds',
  },
];
