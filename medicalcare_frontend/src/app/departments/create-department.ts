import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BaseServices } from '../services/base-service';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { enviroment } from '../../enviroments/enviroment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Hospital } from '../models/hospital';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-create-department',
  imports: [RouterLink, 
            RouterOutlet, 
            ReactiveFormsModule,
            NgIf, NgFor, NgClass],
  templateUrl: './create-department.html',
  styleUrl: './create-department.css',
  providers: [BaseServices]
})
export class CreateDepartment extends BaseComponent implements OnInit{
  
  hospitalItems: Hospital[] = [];
  doctorItems: Doctor[] = [];

  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute,
    private formBuilder: FormBuilder
  ){
    super(
      `${enviroment.apiUrl}/Departments`,
      "",
      "Create Department Successful",
      "/Department", 
      router, 
      baseSrv,
      dialogService,
      alertService,
      routerActive
    );
  } 

  override ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      phone: [""],
      hospital_id: [""],
      doctor_id: [""]
    });
    this.getDoctors();
    this.getHospitals();
  }

  private getHospitals(){
    this.baseSrv.GetItems(`${enviroment.apiUrl}/Hospitals`)
      .subscribe(items =>{
        this.hospitalItems = items;
      });
  }

  private getDoctors(){
    this.baseSrv.GetItems(`${enviroment.apiUrl}/Doctors`)
      .subscribe(items =>{
        this.doctorItems = items;
      });
  }
}
