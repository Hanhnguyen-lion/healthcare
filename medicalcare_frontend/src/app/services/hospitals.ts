import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Hospital } from '../models/hospital';
import { BaseServices } from './base-service';
import { HttpClient } from '@angular/common/http';

const baseUrl = `${enviroment.apiUrl}/Hospitals`;

@Injectable({
  providedIn: 'root',
})
export class HospitalsService{
  
  private hospitalSubject: BehaviorSubject<Hospital | null>;
  public hospital: Observable<Hospital | null>;
  
  constructor(
    private http: HttpClient,
    private baseService: BaseServices
  ){
    this.hospitalSubject = new BehaviorSubject<Hospital | null>(null);
    this.hospital = this.hospitalSubject.asObservable();
  }
  
  GetHospitals(): Observable<Hospital[]>{
    return this.baseService.GetItems(baseUrl, this.http);
  }
  
}
