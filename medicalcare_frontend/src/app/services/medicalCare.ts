import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Account } from '../models/account';
import { Router } from '@angular/router';

const baseUrl = `${enviroment.apiUrl}/Accounts`;

@Injectable({
  providedIn: 'root',
})
export class MedicalCareService {
  
  prescriptionItem: any[] = [];

}
