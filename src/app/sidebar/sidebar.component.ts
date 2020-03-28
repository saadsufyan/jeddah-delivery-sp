import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard',     title: 'Dashboard',         icon: 'nc-bank',       class: '' },
    { path: '/category',      title: 'Category',     icon: 'nc-bank',      class: '' },
    { path: '/products',      title: 'My Products',     icon: 'nc-bank',      class: '' },
    { path: '/pending-order',      title: 'Pending Orders',     icon: 'nc-bank',      class: '' },
    { path: '/completed-order',      title: 'Completed Orders',     icon: 'nc-bank',      class: '' },
    { path: '/cancel-order',      title: 'Concelled Orders',     icon: 'nc-bank',      class: '' }

];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
