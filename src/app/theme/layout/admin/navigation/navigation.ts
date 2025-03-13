import { style } from '@angular/animations';
import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/demo/core/services/global.service';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'dashboard',
    title: 'Menu',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/default',
        icon: 'ti ti-dashboard',
        // breadcrumbs: false
      }
    ]
  },
  {
    id: 'invoice',
    title: 'Invoice Information',
    type: 'item',
    icon: 'ti ti-list',
    url: '/invoice-list',
    classes: 'nav-item'
  },  
  {
    id: 'adminPanel',
    title: 'User Management',
    type: 'item',
    icon: 'ti ti-user',
    url: '/Report',
    classes: 'nav-item',
    style: "font-size: 2004px;"
  }, 
  {
    id: 'Report1_Validators',
    title: 'Report 1 - Validators',
    type: 'item',
    icon: 'ti ti-report',
    url: '/Report_validators',
    classes: 'nav-item',
  }, 
  {
    id: 'Report2_Aging',
    title: 'Report 2 - Aging',
    type: 'item',
    icon: 'ti ti-report',
    url: '/Report_Aging',
    classes: 'nav-item',
  }
];

@Injectable()
export class NavigationItem {
  constructor(private globalService: GlobalService) {}

  get() {


    // Clone the original NavigationItems to avoid mutating it
    let filteredNavigationItems = JSON.parse(JSON.stringify(NavigationItems));

    // Filter out the Admin Panel if the user is not an Admin
    if (this.globalService.getRealm() !== 'Admin') {
      const adminItems = ['adminPanel', 'Report1_Validators', 'Report2_Aging'];
      filteredNavigationItems = filteredNavigationItems.filter(item => !adminItems.includes(item.id));
    }
    return filteredNavigationItems;
  }
}