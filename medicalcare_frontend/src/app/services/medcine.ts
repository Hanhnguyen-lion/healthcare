import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { BaseServices } from './base-service';
import { Medicine } from '../models/medicine';
import { HttpClient } from '@angular/common/http';

const baseUrl = `${enviroment.apiUrl}/Medicines`;

@Injectable({
  providedIn: 'root',
})
export class MedicinesService extends BaseServices{
  
  private itemSubject: BehaviorSubject<Medicine | null>;
  public item: Observable<Medicine | null>;
  
  constructor(
    public override http: HttpClient
  ){
    super(http);
    this.itemSubject = new BehaviorSubject<Medicine | null>(null);
    this.item = this.itemSubject.asObservable();
  }
  
  GetMedicines(): Observable<Medicine[]>{
    return this.GetItems(baseUrl);
  }
  
}
