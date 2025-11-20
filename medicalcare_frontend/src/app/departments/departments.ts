import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Department } from '../models/department';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { DepartmentsService } from '../services/department';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-departments',
  imports: [RouterLink, RouterOutlet, NgFor, AsyncPipe],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})


export class DepartmentsComponent implements OnInit{
  

  departments?: Observable<Department[]>;
  departments_1?: Observable<Department[]>;

  constructor(
    private svc: DepartmentsService

  ){

  }

  getDepartments(){
    this.departments_1 = this.svc.GetDepartments();
    this.departments = this.departments_1;
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  onDelete(id: number){

  }

}
