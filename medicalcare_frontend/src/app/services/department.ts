import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { BaseServices } from './base-service';
import { Department } from '../models/department';
import { HttpClient } from '@angular/common/http';

const baseUrl = `${enviroment.apiUrl}/Departments`;

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService extends BaseServices{
  
  private departmentSubject: BehaviorSubject<Department | null>;
  public department: Observable<Department | null>;
  
  constructor(
    public override http: HttpClient,
  ){
    super(http);
    this.departmentSubject = new BehaviorSubject<Department | null>(null);
    this.department = this.departmentSubject.asObservable();
  }
  
  GetDepartments(): Observable<Department[]>{
    return this.GetItems(baseUrl);
  }
  
}
