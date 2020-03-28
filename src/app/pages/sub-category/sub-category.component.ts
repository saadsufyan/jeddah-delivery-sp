import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  items = [];
  dtTrigger = new Subject();
  id: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 25
      };

      if (this.activatedroute.snapshot.params['id']) {
        this.activatedroute.params.subscribe(params => {
          this.id = params['id'];
        });
      }

      this.spinner.show();
      this.http.get(`https://najeek.herokuapp.com/service/sub_category?id=${this.id}`)
        .subscribe((items: any) => {
          console.log('person ', items);
          this.spinner.hide();
          this.items = items;
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        });
    }

    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }

    navigateAddSubCategory() {
      this.router.navigate(['/add-sub-category']);
    }
}
