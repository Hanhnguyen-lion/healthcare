import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BaseServices {

  // httpHeader = {headers: new HttpHeaders({
  //   "Content-Type": "application/json"
  // })};  

  constructor(
    public http: HttpClient){
  }

  GetItems(url: string): Observable<any[]>{
    return this.http.get<any[]>(url);
  }
}
