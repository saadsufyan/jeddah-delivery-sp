import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

let temp;

@Injectable({
  providedIn: 'root'
})
export class GeneralApiService {

  constructor(public http: HttpClient, ) { }


  sendData(data) {

    temp = data
    console.log(temp)
  }
  fetchData() {
    return temp;
  }
  GetRequest(url) {
    return new Promise(resolve => {
      // this.localStorrage.get(environment.baseUrl_TOKEN).then((res) => {

      console.log(environment.baseUrl + url)

      let resp;


      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json'
      // })
      // , { headers: headers }
      this.http.get(environment.baseUrl + url)
        .subscribe((res) => {
          console.log(res)
          resp = res;
          // this.showToast(JSON.stringify(res))
          resolve(resp)
        }, (err) => {
          console.log(err, 'err')
          if (err.status === 0) {
            // this.presentErrorAlert()
          }
          resolve(err)
        })
      // })
    })
  }


  PostRequest(url, data) {
    return new Promise(resolve => {
      // this.localStorrage.get(environment.baseUrl_TOKEN).then((res) => {

      let resp;
      this.http.post(environment.baseUrl + url, data)
        .subscribe((res) => {
          console.log(res)
          // this.showToast(JSON.stringify(res))
          resp = res;
          resolve(resp)
        }, (err) => {
          console.log(err, 'err')
          if (err.status === 0) {
            // this.presentErrorAlert()
          }
          resolve(err)
        })
      // })
    })
  }

}
