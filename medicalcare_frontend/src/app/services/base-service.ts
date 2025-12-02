import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';

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

  SearchItems(url: string, item: any): Observable<any>{

    return this.http.get(url, {params: item});
  }

  PrescriptionItemsToPatient(url: string, 
      patient_id: number, 
      medicalcare_id: number): Observable<any>{
    
        var item: any = {
          patient_id : patient_id,
          medicalcare_id: medicalcare_id
        };
    return this.http.get(url, {params: {item}});
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
    console.log("url:", url);
    return this.http.post<any>(url, item, this.httpHeader);
  }
}
