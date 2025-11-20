import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Doctor } from '../models/doctor';
import { Observable } from 'rxjs';
import { DoctorsService } from '../services/doctor';

@Component({
  selector: 'app-doctors',
  imports: [RouterLink, RouterOutlet, NgFor, AsyncPipe],
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
})
export class DoctorsCompnonent implements OnInit{
  

  items?: Observable<Doctor[]>;
  items_1?: Observable<Doctor[]>;

  constructor(
    private svc: DoctorsService

  ){

  }

  getDoctors(){
    this.items_1 = this.svc.GetDoctors();
    this.items = this.items_1;
  }

  ngOnInit(): void {
    this.getDoctors();
  }

  onDelete(id: number){

  }

}
