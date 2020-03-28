import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProfileService } from 'app/services/profile/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  profileData;
  dtTrigger = new Subject();
  register = new FormGroup({
    name: new FormControl('', Validators.required),
    license_number: new FormControl('', Validators.required),
    mobile_number: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    // password: new FormControl('',Validators.required),
    city: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),

  });


  constructor(
    private http: HttpClient,
    private router: Router,
    public profileApi: ProfileService,
    private spinner: NgxSpinnerService) { }


  ngOnInit() {
    this.getProfileDetails();
  }

  setData() {

    this.register = new FormGroup({
      name: new FormControl(this.profileData.name, Validators.required),
      license_number: new FormControl(this.profileData.license_number, Validators.required),
      mobile_number: new FormControl(this.profileData.mobile, Validators.required),
      email: new FormControl(this.profileData.email, Validators.required),
      city: new FormControl(this.profileData.city, Validators.required),
      location: new FormControl(this.profileData.location, Validators.required),
      // image: new FormControl(this.profileData.license_image,Validators.required),

    });
  }
  getProfileDetails() {
    this.spinner.show();
    this.profileApi.getProfile().subscribe((res: any) => {
      console.log(res);
      this.spinner.hide();
      this.profileData = res.user;
      this.setData()
    }, err => {
      console.log(err);
    })
  }


  onSubmit() {
    console.log(this.register)
    // const formData = new FormData();
    const data = {
      name: this.register.get('name').value,
      mobile: this.register.get('mobile_number').value,
      email: this.register.get('email').value,
      license_number: this.register.get('license_number').value,
      city: this.register.get('city').value,
      location: this.register.get('location').value,
    }
    console.log(data)
    this.profileApi.updateProfile(data).subscribe((res: any) => {
      if (res.status === 200) {
        this.getProfileDetails();
        console.log('profile  updated', res)
      }
    })
  }
}
