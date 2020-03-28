import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'app/services/login/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pass-code',
  templateUrl: './pass-code.component.html',
  styleUrls: ['./pass-code.component.scss'],
  providers: [LoginService]
})
export class PassCodeComponent implements OnInit {

  verifyPasswordForm = new FormGroup({
    mobile: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required)
  })
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }
  ngOnInit() {
  }
  onSubmit() {
    this.spinner.show();
    const body = {
      mobile: this.verifyPasswordForm.get('mobile').value,
      code: this.verifyPasswordForm.get('code').value
    }
    console.log('body ', body);
    this.loginService.verifyPassword(body).subscribe((res: any) => {
      console.log(res)
      this.spinner.hide();
      if (res) {
        localStorage.setItem('mobile', body.mobile);
        this.router.navigate(['/reset-password']);
      }
    });
  }
}
