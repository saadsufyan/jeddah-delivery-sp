import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  constructor(private http: HttpClient) {}

  create(body) {
    return this.http.post(`${environment.baseUrl}/admin/subcategory`, body);
  }

  getAll() {
    return this.http.get(`${environment.baseUrl}/admin/subcategory`);
  }
}
