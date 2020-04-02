import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrdersService } from 'app/services/orders/orders.service';
import { ToastrService } from 'ngx-toastr';
import { SharedServiceService } from 'app/services/sharedService/shared-service.service';

@Component({
  selector: 'app-shipped-orders',
  templateUrl: './shipped-orders.component.html',
  styleUrls: ['./shipped-orders.component.scss'],
  providers: [OrdersService, SharedServiceService]
})
export class ShippedOrdersComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  items = [];
  dtTrigger = new Subject();

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private sharedService: SharedServiceService,
    private orderApi: OrdersService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      order: []
    };
    this.getShippedOrder();
  }
  getShippedOrder() {
    this.spinner.show()
    this.orderApi.GetShippedOrder().subscribe((res: any) => {
      console.log(res);
      this.spinner.hide();
      this.items = res.message;
      this.dtTrigger.next();
    }, err => {
      console.log(err);
      this.spinner.hide();
      if (err.status === 200) {
        // this.toastr.success('Category has been updated successfully', 'Category Added');
      } else {
        this.toastr.error('Something went wrong', 'Failure', {
          timeOut: 3000
        });
      }
    });
  }
  onDelivered(id) {
    this.spinner.show()
    const data = {
      order_id: id
    }
    this.orderApi.orderDelivered(data).subscribe((res: any) => {
      console.log(res);
      this.spinner.hide();
    }, err => {
      console.log(err);
      this.spinner.hide();
      if (err.status === 200) {
        // this.toastr.success('Category has been updated successfully', 'Category Added');
      } else {
        this.toastr.error('Something went wrong', 'Failure', {
          timeOut: 3000
        });
      }
    });
  }

  onFailed(id) {
    this.spinner.show()
    const data = {
      order_id: id
    }
    this.orderApi.orderFailed(data).subscribe((res: any) => {
      console.log(res);
      this.spinner.hide();
    }, err => {
      console.log(err);
      this.spinner.hide();
      if (err.status === 200) {
        // this.toastr.success('Category has been updated successfully', 'Category Added');
      } else {
        this.toastr.error('Something went wrong', 'Failure', {
          timeOut: 3000
        });
      }
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
