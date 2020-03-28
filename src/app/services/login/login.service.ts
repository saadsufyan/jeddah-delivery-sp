import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(body) {
      return this.http.post(`${environment.baseUrl}/users/login_service_provider`, body, {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
      }
      );
  }
  forgotPassword(body) {
    return this.http.post(`${environment.baseUrl}/users/forgot_password_sp`, body, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
    }
    );
  }
  verifyPassword(body) {
    return this.http.post(`${environment.baseUrl}/users/verify_forgot_sp`, body, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
    }
    );
  }
  resetPassword(body) {
    return this.http.post(`${environment.baseUrl}/users/update_password_sp`, body, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
    }
    );
  }
}
