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
export class HospitalsService extends BaseServices{
  
  constructor(
    public override http: HttpClient,
  ){
    super(http);
  }
  
  // GetHospitals(): Observable<Hospital[]>{
  //   return this.GetItems(baseUrl);
  // }
  
}
