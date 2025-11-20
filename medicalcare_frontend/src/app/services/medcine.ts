import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { BaseServices } from './base-service';
import { Medicine } from '../models/medicine';
import { HttpClient } from '@angular/common/http';

const baseUrl = `${enviroment.apiUrl}/Doctors`;

@Injectable({
  providedIn: 'root',
})
export class MedicinesService{
  
  private itemSubject: BehaviorSubject<Medicine | null>;
  public item: Observable<Medicine | null>;
  
  constructor(
    private baseService: BaseServices,
    private http: HttpClient
  ){
    this.itemSubject = new BehaviorSubject<Medicine | null>(null);
    this.item = this.itemSubject.asObservable();
  }
  
  GetMedicines(): Observable<Medicine[]>{
    return this.baseService.GetItems(baseUrl, this.http);
  }
  
}
