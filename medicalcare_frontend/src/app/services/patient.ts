import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';
import { Patient } from '../models/patient';

const baseUrl = `${enviroment.apiUrl}/Patients`;

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  
  private patientSubject: BehaviorSubject<Patient | null>;
  public patient: Observable<Patient | null>;

  httpHeader = {headers: new HttpHeaders({
    "Content-Type": "application/json"
  })};
  
  constructor(
    private http: HttpClient,
    private router: Router
  ){
    this.patientSubject = new BehaviorSubject<Patient | null>(null);
    this.patient = this.patientSubject.asObservable();
  }
  
  GetPatients(): Observable<Patient[]>{
    return this.http.get<Patient[]>(baseUrl);
  }
  
  GetPatientById(id: number): Observable<Patient>{
    const url = `${baseUrl}/${id}`;
    return this.http.get<Patient>(url)
    .pipe(map(item =>{
      this.patientSubject.next(item);
      return item;
    }));
  }

  Delete(id: number): Observable<void>{
    const url = `${baseUrl}/Delete/${id}`;
    return this.http.delete<void>(url);
  }

  Update(item: Patient): Observable<Patient>{
    const url = `${baseUrl}/Edit/${item.id}`;
    return this.http.put<Patient>(url, item, this.httpHeader);
  }

  Add(item: Patient): Observable<Patient>{
    const url = `${baseUrl}/Add`;
    return this.http.post<Patient>(url, item, this.httpHeader);
  }

  public get patientValue(): Patient | null{
    return this.patientSubject.value;
  }
}
