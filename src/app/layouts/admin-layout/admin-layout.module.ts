import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { CategoryComponent } from '../../pages/category/category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from 'app/pages/profile/profile.component';
import { SubCategoryComponent } from 'app/pages/sub-category/sub-category.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductsComponent } from 'app/pages/products/products.component';
import { ProductDetailComponent } from 'app/pages/product-detail/product-detail.component';
import { PendingOrderComponent } from 'app/pages/pending-order/pending-order.component';
import { CompletedOrderComponent } from 'app/pages/completed-order/completed-order.component';
import { ConcelledOrderComponent } from 'app/pages/concelled-order/concelled-order.component';
import { OrderDetailComponent } from 'app/pages/order-detail/order-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    NgxDatatableModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    NgxSpinnerModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    CategoryComponent,
    SubCategoryComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProfileComponent,
    PendingOrderComponent,
    CompletedOrderComponent,
    ConcelledOrderComponent,
    OrderDetailComponent
  ]
})

export class AdminLayoutModule {}
