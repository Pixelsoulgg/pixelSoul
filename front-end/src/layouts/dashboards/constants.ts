export interface INavigationItem {
  name: string;
  icon: string;
  nav?: string
}

export const MENUS: INavigationItem[] = [
  // {name: 'Home', nav: '/', icon: 'home.svg'},
  {name: 'Dashboard', nav: '/', icon: 'heart.svg'},
  {name: 'Play to Earn', nav: '/games', icon: 'play-to-earn.svg'},
  {name: 'Tavern', nav: '/games/detail', icon: 'tavern.svg'},
  // {name: 'Reporting', nav: '/report', icon: 'report.svg'},
  // {name: 'Users', nav: '/users', icon: 'user.svg'},
]

export const SETTING_MENU: INavigationItem[] = [
  {name: 'Support', nav: '/', icon: 'support.svg'},
  {name: 'Settings', nav: '/', icon: 'setting.svg'},
]