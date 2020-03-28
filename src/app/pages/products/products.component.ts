import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { ProductsService } from 'app/services/products/products.service';
import { SharedServiceService } from 'app/services/sharedService/shared-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsService, SharedServiceService]
})
export class ProductsComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  items = [];
  dtTrigger = new Subject();
  mainCategoryList;
  catObj;

  constructor(
    private http: HttpClient,
    private router: Router,
    public productApi: ProductsService,
    private toastr: ToastrService,
    private sharedService: SharedServiceService,
    private spinner: NgxSpinnerService) { }


    ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 25,
        order: []
      };
      this.getProducts();
    }
    getProducts() {
      this.spinner.show()
      this.productApi.getAll().subscribe((res: any) => {
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
    addProduct() {
      this.router.navigateByUrl('/product-detail');
    }
    onUpdate(id) {
      const index = this.items.findIndex(x => x.id === id);
      if (id) {
        this.sharedService.sendData(this.items[index]);
      }
      this.router.navigateByUrl('/product-detail?id=' + id);
    }
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
}
