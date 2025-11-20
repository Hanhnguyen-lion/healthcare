import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { BaseServices } from './base-service';
import { Doctor } from '../models/doctor';
import { HttpClient } from '@angular/common/http';

const baseUrl = `${enviroment.apiUrl}/Doctors`;

@Injectable({
  providedIn: 'root',
})
export class DoctorsService extends BaseServices{
  
  private itemSubject: BehaviorSubject<Doctor | null>;
  public item: Observable<Doctor | null>;
  
  constructor(
    public override http: HttpClient
  ){
    super(http);
    this.itemSubject = new BehaviorSubject<Doctor | null>(null);
    this.item = this.itemSubject.asObservable();
  }
  
  GetDoctors(): Observable<Doctor[]>{
    return this.GetItems(baseUrl);
  }
  
}
