import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainCategoryService } from 'app/services/main-category/main-category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [MainCategoryService]
})
export class CategoryComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  items = [];
  dtTrigger = new Subject();

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private categoryApi: MainCategoryService) { }

    ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 25,
        order: []
      };
      this.getCategories();
    }

    getCategories() {
      this.spinner.show();
        this.categoryApi.getAll().subscribe((res: any) => {
          console.log('category ', res);
          this.spinner.hide();
          this.items = res.message;
          // Calling the DT trigger to manually render the table
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
    navigateAddCategory() {
      this.router.navigateByUrl('/add-main-category');
    }

    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
  }

