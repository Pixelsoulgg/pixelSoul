export interface INavigationItem {
  name: string;
  icon: string;
  nav?: string
}

export const MENUS: INavigationItem[] = [
  // {name: 'Home', nav: '/', icon: 'home.svg'},
  {name: 'Dashboard', nav: '/', icon: 'love.svg'},
  {name: 'Play to Earn', nav: '/games', icon: 'play.svg'},
  {name: 'Tavern', nav: '/tavern', icon: 'task.svg'},
  // {name: 'Dashboard', nav: '/games', icon: 'dashboard.svg'},
  // {name: 'Projects', nav: '/projects', icon: 'project.svg'},
  // {name: 'Tasks', nav: '/tasks', icon: 'task.svg'},
  // {name: 'Reporting', nav: '/report', icon: 'report.svg'},
  // {name: 'Users', nav: '/users', icon: 'user.svg'},
]

export const LIST_AVATAR: string[] = [
  "profile_01", 
  "profile_02", 
  "profile_03", 
  "profile_04", 
  "profile_05", 
  "profile_06", 
  "profile_07", 
  "profile_08", 
  "profile_09", 
  "profile_10", 
  "profile_11", 
  "profile_12", 
  "profile_13", 
  "profile_14", 
  "profile_15", 
  "profile_16", 
]


export const SETTING_MENU: INavigationItem[] = [
  {name: 'Support', nav: '/', icon: 'support.svg'},
  {name: 'Settings', nav: '/', icon: 'setting.svg'},
]