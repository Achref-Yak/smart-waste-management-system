
declare interface RouteInfo {
  routeLink: string;
  icon: string;
  label: string;

}
export const navbarData = [
  {
    routeLink :'dash',
    icon : 'fal fa-home',
    label : 'Dashboard'
  },
  {
    routeLink :'map',
    icon : 'fal fa-map',
    label : 'Map'
  },

  {
    routeLink :'employees',
    icon : 'fal fa-address-card',
    label : 'Employees'
  },

  {
    routeLink :'trucks',
    icon : 'fal fa-truck-container',
    label : 'Trucks'
  },
  {
    routeLink :'trushs',
    icon : 'fal fa-dumpster',
    label : 'Trash'
  },

  {
    routeLink :'clients',
    icon : 'fal fa-user-edit',
    label : 'Client'
  },
  {
    routeLink :'reports',
    icon : 'fal fa-comments', 
    label : 'Report'
  },
  
 {
    routeLink :'',
    icon : 'fal fa-sign-out',
    label : 'Logout'
  },
] ;
