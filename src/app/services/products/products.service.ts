import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  token
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  create(payload) {
    return this.http
    .post(`${environment.baseUrl}/users/product`, payload, {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'x-access-token': this.token
        })
    });
  }

  update(payload) {
    return this.http
    .post(`${environment.baseUrl}/users/update_product`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'x-access-token': this.token
      })
    });
  }
  getAll() {
    return this.http
    .get(`${environment.baseUrl}/users/my_products`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.token
        }
    });
  }
}
