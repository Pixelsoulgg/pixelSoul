export interface INavigationItem {
  name: string;
  icon: string;
  nav?: string
}

export const MENUS: INavigationItem[] = [
  {name: 'Dashboard', nav: '/', icon: 'heart'},
  {name: 'Dungeon', nav: '/dungeons', icon: 'play-to-earn'},
  {name: 'Tavern', nav: '/games/detail', icon: 'tavern'},
  // {name: 'Reporting', nav: '/report', icon: 'report.svg'},
  // {name: 'Users', nav: '/users', icon: 'user.svg'},
]

export const SETTING_MENU: INavigationItem[] = [
  {name: 'Support', nav: '/', icon: 'support'},
  {name: 'Settings', nav: '/', icon: 'setting'},
]