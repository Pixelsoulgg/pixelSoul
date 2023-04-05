export interface INavigationItem {
  name: string;
  icon: string;
  nav?: string
}

export const MENUS: INavigationItem[] = [
  {name: 'My Soul', nav: '/my-souls', icon: 'heart'},
  {name: 'Dungeon', nav: '/dungeons', icon: 'play-to-earn'},
  {name: 'Tavern', nav: '/games/detail', icon: 'tavern'},
]

export const SETTING_MENU: INavigationItem[] = [
  {name: 'Support', nav: '/my-souls', icon: 'support'},
  {name: 'Settings', nav: '/my-souls', icon: 'setting'},
]