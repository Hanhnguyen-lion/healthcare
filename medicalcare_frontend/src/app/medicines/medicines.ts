import { AsyncPipe, DatePipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Medicine } from '../models/medicine';
import { MedicinesService } from '../services/medcine';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-medicines',
  imports: [NgFor, AsyncPipe, RouterLink, RouterOutlet, DatePipe],
  templateUrl: './medicines.html',
  styleUrl: './medicines.css',
})
export class MedicinesComponent implements OnInit{
  

  items?: Observable<Medicine[]>;
  items_1?: Observable<Medicine[]>;

  constructor(
    private svc: MedicinesService

  ){

  }

  getMedicines(){
    this.items_1 = this.svc.GetMedicines();
    this.items = this.items_1;
  }

  ngOnInit(): void {
    this.getMedicines();
  }

  onDelete(id: number){

  }

}
