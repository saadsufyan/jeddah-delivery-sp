import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  token: any;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  getProfile() {
    return this.http
    .get(`${environment.baseUrl}/users/profile_details`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.token
        }
    });
  }
  updateProfile(body) {
    return this.http
    .post(`${environment.baseUrl}/users/update_profile`, body, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.token
        }
    });
  }
}

