import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class BaseServices {

  httpHeader = {headers: new HttpHeaders({
    "Content-Type": "application/json"
  })};  

  constructor(
    public http: HttpClient){
  }

  GetItems(url: string): Observable<any[]>{
    return this.http.get<any[]>(url);
  }

  GetItemById(id: number, url: string): Observable<any>{
    url = `${url}/${id}`;
    return this.http.get<any>(url)
    .pipe(map(item =>{
      return item;
    }));
  }

  Delete(id: number, url: string): Observable<void>{
    url = `${url}/Delete/${id}`;
    return this.http.delete<void>(url);
  }

  Update(item: any, url: string): Observable<any>{
    url = `${url}/Edit/${item.id}`;
    return this.http.put<any>(url, item, this.httpHeader);
  }

  Add(item: any, url: string): Observable<any>{
    url = `${url}/Add`;
    return this.http.post<any>(url, item, this.httpHeader);
  }
}
