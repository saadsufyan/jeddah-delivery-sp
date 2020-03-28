import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralApiService } from 'app/services/general-api.service';
import { constants } from 'app/Utils/Constants';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register = new FormGroup({
    name: new FormControl('', Validators.required),
    license_number: new FormControl('', Validators.required),
    mobile_number: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    image: new FormControl(null, Validators.required),

  });


  constructor(
    private api: GeneralApiService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {

  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.register.get('image').setValue(file);
    }
  }

  onSubmit() {

    this.spinner.show();
    console.log(this.register)

    const formData = new FormData();
    formData.append('image', this.register.get('image').value)
    formData.append('name', this.register.get('name').value)
    formData.append('mobile', this.register.get('mobile_number').value)
    formData.append('email', this.register.get('email').value)
    formData.append('license_number', this.register.get('license_number').value)
    formData.append('city', this.register.get('city').value)
    formData.append('password', this.register.get('password').value);
    this.api.PostRequest(constants.USER_REGISTER, formData).then((data: any) => {
      console.log(data)
      this.spinner.hide();
      if (data.status === 200 ) {
        this.router.navigate(['/login']);
      }
    })
    // this.categoryService.create(formData).subscribe(res => console.log('category add', res))
  }
}
