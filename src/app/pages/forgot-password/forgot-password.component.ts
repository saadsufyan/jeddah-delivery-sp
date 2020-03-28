import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'app/services/login/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [LoginService]
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm = new FormGroup({
    mobile: new FormControl('', Validators.required)
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
      mobile: this.forgotPasswordForm.get('mobile').value
    }
    console.log('body ', body);
    this.loginService.forgotPassword(body).subscribe((res: any) => {
      console.log(res)
      if (res) {
        this.spinner.hide();
        localStorage.setItem('mobile', body.mobile);
        this.router.navigate(['/verify-password']);
      }
    });
  }
}
