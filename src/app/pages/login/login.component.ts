import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'app/services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    mobile: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.spinner.show()
    const body = {
      mobile: this.loginForm.get('mobile').value,
      password: this.loginForm.get('password').value
    }
    console.log('body ', body);
    this.loginService.loginUser(body).subscribe((res: any) => {
      console.log(res)
      this.spinner.hide();
      if (res.access_key) {
        localStorage.setItem('token', res.access_key);
        localStorage.setItem('name', res.user.name);
        this.router.navigate(['/category']);
      }
    });
  }

  gotoRegister() {
    this.router.navigateByUrl('/register');

  }

}
