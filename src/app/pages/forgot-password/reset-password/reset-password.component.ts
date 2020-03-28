import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'app/services/login/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm = new FormGroup({
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
      mobile: this.resetPasswordForm.get('mobile').value,
      password: this.resetPasswordForm.get('password').value
    }
    console.log('body ', body);
    this.loginService.resetPassword(body).subscribe((res: any) => {
      console.log(res)
      this.spinner.hide();
      if (res) {
        localStorage.setItem('mobile', body.mobile);
        this.router.navigate(['/login']);
      }
    });
  }
}
