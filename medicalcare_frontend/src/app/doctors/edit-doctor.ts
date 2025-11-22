import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { Hospital } from '../models/hospital';
import { Doctor } from '../models/doctor';
import { BaseServices } from '../services/base-service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { enviroment } from '../../enviroments/enviroment';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Department } from '../models/department';

@Component({
  selector: 'app-edit-doctor',
  imports: [RouterLink, RouterOutlet,
    ReactiveFormsModule, NgClass,
    NgIf, NgFor],
  templateUrl: './edit-doctor.html',
  styleUrl: './edit-doctor.css',
  providers: [BaseServices]
})
export class EditDoctor extends BaseComponent implements OnInit{
  
  departmentItems: Department[] = [];
  hospitalItems: Department[] = [];

  department_id: number = 0; 
  hospital_id: number = 0; 
 
  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute,
    private formBuilder: FormBuilder
  ){
    super(
      `${enviroment.apiUrl}/Doctors`, 
      "", 
      "Edit Doctor successful",
      "/Doctor",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive)
  }

  override ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", Validators.email],
      phone: [""],
      gender: ["Female", Validators.required],
      quanlification: [""],
      job_specification: [""],
      hospital_id: [0],
      department_id: [0]
    });

    this.setFormValue();

    this.getHospitals();
    this.getDepartmentItems();
  }

  private getDepartmentItems(){
    this.baseSrv.GetItems(`${enviroment.apiUrl}/Departments`)
      .subscribe(items =>{
        this.departmentItems = items;
      });
  }

  private getHospitals(){
    this.baseSrv.GetItems(`${enviroment.apiUrl}/Hospitals`)
      .subscribe(items =>{
        this.hospitalItems = items;
      });
  }

  private setFormValue(){
    var id = +this.routerActive.snapshot.params["id"] |0;
    this.baseSrv.GetItemById(id, this.apiUrl)
      .subscribe(item =>{
        this.hospital_id = +item.hospital_id | 0;
        this.department_id = +item.department_id| 0;

        this.form.setValue({
          first_name: item.first_name,
          last_name: item.last_name,
          email: item.email,
          phone: item.phone,
          gender: item.gender,
          quanlification: item.quanlification,
          job_specification: item.job_specification, 
          hospital_id: this.hospital_id, 
          department_id: this.department_id
        });
      },
      error=>{
        this.alertService.error(error);
      });
  }

}
