import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrdersService } from 'app/services/orders/orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.scss'],
  providers: [OrdersService]
})
export class PendingOrderComponent implements OnInit, OnDestroy {


  dtOptions: DataTables.Settings = {};
  items = [];
  dtTrigger = new Subject();

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private orderApi: OrdersService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      order: []
    };
    this.getPendingOrders();
  }

  getPendingOrders() {
    this.spinner.show()
    this.orderApi.pendingOrders().subscribe((res: any) => {
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
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
