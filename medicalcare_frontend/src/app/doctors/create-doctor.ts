import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { BaseServices } from '../services/base-service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { enviroment } from '../../enviroments/enviroment';
import { AsyncPipe, NgClass} from '@angular/common';
import { Department } from '../models/department';
import { Hospital } from '../models/hospital';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-doctor',
  imports: [RouterLink, RouterOutlet, 
            ReactiveFormsModule, NgClass, AsyncPipe],
  templateUrl: './create-doctor.html',
  styleUrl: './create-doctor.css',
  providers: [BaseServices]
})
export class CreateDoctor extends BaseComponent implements OnInit{

  hospitalItems?: Observable<Hospital[]>;
  departmentItems?: Observable<Department[]>;

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
      "Create Doctor successful",
      "/Doctor",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive)
  }

  override ngOnInit(): void {

    this.hospitalItems = this.baseSrv.GetItems(`${enviroment.apiUrl}/Hospitals`);
    this.departmentItems = this.baseSrv.GetItems(`${enviroment.apiUrl}/Departments`);

    this.form = this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", Validators.email],
      phone: [""],
      gender: ["Female", Validators.required],
      quanlification: [""],
      job_specification: [""],
      hospital_id: [""],
      department_id: [""]
    });
  }
}
