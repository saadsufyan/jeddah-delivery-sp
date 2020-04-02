import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { CategoryComponent } from '../../pages/category/category.component';
import { SubCategoryComponent } from 'app/pages/sub-category/sub-category.component';
import { ProfileComponent } from 'app/pages/profile/profile.component';
import { ProductDetailComponent } from 'app/pages/product-detail/product-detail.component';
import { ProductsComponent } from 'app/pages/products/products.component';
import { PendingOrderComponent } from 'app/pages/pending-order/pending-order.component';
import { CompletedOrderComponent } from 'app/pages/completed-order/completed-order.component';
import { ConcelledOrderComponent } from 'app/pages/concelled-order/concelled-order.component';
import { OrderDetailComponent } from 'app/pages/order-detail/order-detail.component';
import { ShippedOrdersComponent } from 'app/pages/shipped-orders/shipped-orders.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'category',      component: CategoryComponent },
    { path: 'sub-category/:id',      component: SubCategoryComponent },
    { path: 'products',      component: ProductsComponent },
    { path: 'product-detail',      component: ProductDetailComponent },
    { path: 'pending-order',      component: PendingOrderComponent },
    { path: 'completed-order',      component: CompletedOrderComponent },
    { path: 'cancel-order',      component: ConcelledOrderComponent },
    { path: 'order-detail/:id',      component: OrderDetailComponent },
    { path: 'shipped-order',      component: ShippedOrdersComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'profile',        component: ProfileComponent }

];
