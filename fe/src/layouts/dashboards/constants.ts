export interface INavigationItem {
  name: string;
  icon: string;
  nav?: string
}

export const MENUS: INavigationItem[] = [
  {name: 'My Soul', nav: '/my-souls', icon: 'heart'},
  {name: 'SoulDrop', nav: '/soul-drops', icon: 'soul-drop'},
  // {name: 'Dungeon', nav: '/dungeons', icon: 'play-to-earn'},
  // {name: 'Tavern', nav: '/taverns', icon: 'tavern'},
  // {name: 'Forge', nav: '/forges', icon: 'forge'},
  {name: 'Event Board', nav: '/event-board', icon: 'epoch'},
]

export const SETTING_MENU: INavigationItem[] = [
  {name: 'Support', nav: '/supports', icon: 'support'},
  {name: 'Settings', nav: '/settings', icon: 'setting'},
]