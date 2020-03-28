import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MainCategoryService {

  token
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  getAll() {
    return this.http
    .get(`${environment.baseUrl}/users/categories`, {
      // headers: {
      //   'Content-Type': 'application/json',
      //   'x-access-token': this.token
      //   }
    });
  }

}
