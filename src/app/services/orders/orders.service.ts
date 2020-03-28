import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  token
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  pendingOrders() {
    return this.http
    .get(`${environment.baseUrl}/users/pending_orders`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.token
        }
    });
  }

  orderDetails(id) {
    return this.http
    .get(`${environment.baseUrl}/users/order_details?order_id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.token
        }
    });
  }
  completedOrders() {
    return this.http
    .get(`${environment.baseUrl}/users/completed_orders`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.token
        }
    });
  }
  concelledOrders() {
    return this.http
    .get(`${environment.baseUrl}/users/cancelled_orders`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.token
        }
    });
  }
  readyToship(payload) {
    return this.http
    .post(`${environment.baseUrl}/users/order_ready`, {
      payload,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.token
        }
    });
  }
  orderDelivered(payload) {
    return this.http
    .post(`${environment.baseUrl}/users/order_delivered`, {
      payload,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.token
        }
    });
  }
  orderFailed(payload) {
    return this.http
    .post(`${environment.baseUrl}/users/order_failed`, {
      payload,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.token
        }
    });
  }
}
