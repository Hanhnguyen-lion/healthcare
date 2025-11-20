import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class BaseServices {

  httpHeader = {headers: new HttpHeaders({
    "Content-Type": "application/json"
  })};  

  GetItems(url: string, http : HttpClient): Observable<any[]>{
    return http.get<any[]>(url);
  }
}
