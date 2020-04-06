import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MainCategoryService } from 'app/services/main-category/main-category.service';
import { SharedServiceService } from 'app/services/sharedService/shared-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'app/services/products/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [ProductsService, SharedServiceService]
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product = new FormGroup({
    main_category: new FormControl(''),
    main_category_arabic: new FormControl(''),
    sub_category: new FormControl(''),
    sub_category_arabic: new FormControl(''),
    name: new FormControl(''),
    name_arabic: new FormControl(''),
    product_details: new FormControl(''),
    product_details_arabic: new FormControl(''),
    description: new FormControl(''),
    description_arabic: new FormControl(''),
    price: new FormControl(''),
    images: new FormControl(null)
  });
  mainCategoryList = [];
  categorById;
  productData;
  productId: any;
  constructor(
    private productApi: ProductsService,
    private mainCategoryService: MainCategoryService,
    private sharedService: SharedServiceService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productData = this.sharedService.fetchData();
    console.log('fetched data ', this.productData);
    if (this.productData) {
      // this.categorById = this.productData.id;
      this.productId =  this.productData.id;
      console.log('product id ', this.productId);

      this.product.patchValue({
        name: this.productData.name,
        name_arabic: this.productData.name_arabic,
        main_category: this.productData.main_category,
        main_category_arabic: this.productData.main_category_arabic,
        sub_category: this.productData.sub_category,
        sub_category_arabic: this.productData.sub_category_arabic,
        description: this.productData.description,
        description_arabic: this.productData.description_arabic,
        product_details: this.productData.product_details,
        product_details_arabic: this.productData.product_details_arabic,
        price: this.productData.price,
        images: this.productData.images
      })
    }
  }
  getMainCategory() {
    this.mainCategoryService.getAll().subscribe((res: any) => {
      this.mainCategoryList = res.message;
      // console.log('list ', res);
    })
  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.product.get('images').setValue(file);
    }
  }
  onSubmit() {
    this.spinner.show();

    const formData = new FormData();
    formData.append('images', this.product.get('images').value)
    formData.append('main_category', this.product.get('main_category').value)
    formData.append('main_category_arbic', this.product.get('main_category_arabic').value)
    formData.append('sub_category', this.product.get('sub_category').value)
    formData.append('sub_category_arabic', this.product.get('sub_category_arabic').value)
    formData.append('name', this.product.get('name').value)
    formData.append('name_arabic', this.product.get('name_arabic').value)
    formData.append('product_details', this.product.get('product_details').value)
    formData.append('product_details_arabic', this.product.get('product_details_arabic').value)
    formData.append('description', this.product.get('description').value)
    formData.append('description_arabic', this.product.get('description_arabic').value)
    formData.append('price', this.product.get('price').value)
    formData.append('status', 'active')

    if (this.productData) {
      formData.append('id', this.productId);
      console.log(formData); // console
      this.productApi.update(formData).subscribe(res => {
        this.spinner.hide();
        console.log('Product updated', res)
        this.toastr.success('Product has been updated successfully', 'Product Updated');
      }, err => {
        this.spinner.hide();
        console.log(err);
        if (err.status === 200) {
          this.toastr.success('Product has been updated successfully', 'Product Added');
        } else {
          this.toastr.error('Something went wrong', 'Failure', {
            timeOut: 3000
          });
        }
      } )
    } else {
      console.log(this.product);
      console.log(formData);
      this.productApi.create(formData).subscribe(res => {
        this.spinner.hide();
        console.log('Product add', res)
        this.toastr.success('Product has been added successfully', 'Product Added');
      }, err => {
        this.spinner.hide();
        console.log(err);
        if (err.status === 200) {
          this.toastr.success('Product has been added successfully', 'Product Added');
        } else {
          this.toastr.error('Something went wrong', 'Failure', {
            timeOut: 3000
          });
        }
      } )
    }
  }
  ngOnDestroy(): void {
    this.sharedService.sendData(null);
  }
}
