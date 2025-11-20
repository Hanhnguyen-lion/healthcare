import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Hospital } from '../models/hospital';
import { HospitalsService } from '../services/hospitals';

@Component({
  selector: 'app-hospitals',
  imports: [NgFor, RouterLink, RouterOutlet, AsyncPipe],
  templateUrl: './hospitals.html',
  styleUrl: './hospitals.css',
})
export class HospitalsComponent implements OnInit{

  hospitals?:Observable<Hospital[]>;
  hospitals_1?:Observable<Hospital[]>;

  constructor(
    private hospitalsService: HospitalsService
  ){
  }

  ngOnInit(): void {
    this.getHospitals();
  }

  getHospitals(){
    this.hospitals_1 = this.hospitalsService.GetHospitals();
    this.hospitals = this.hospitals_1;
  }

  onDelete(id: number){

  }  
}
