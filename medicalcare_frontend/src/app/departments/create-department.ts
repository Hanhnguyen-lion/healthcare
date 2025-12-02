import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BaseServices } from '../services/base-service';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { enviroment } from '../../enviroments/enviroment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgClass} from '@angular/common';
import { Hospital } from '../models/hospital';
import { Doctor } from '../models/doctor';
import { Observable } from 'rxjs';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-create-department',
  imports: [RouterLink, 
            RouterOutlet, 
            ReactiveFormsModule,
            NgClass, AsyncPipe, Footer],
  templateUrl: './create-department.html',
  styleUrl: './create-department.css',
  providers: [BaseServices]
})
export class CreateDepartment extends BaseComponent implements OnInit{
  
  hospitalItems?: Observable<Hospital[]>;
  doctorItems?: Observable<Doctor[]>;

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
    this.hospitalItems = this.baseSrv.GetItems(`${enviroment.apiUrl}/Hospitals`);
    this.doctorItems = this.baseSrv.GetItems(`${enviroment.apiUrl}/Doctors`);
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      phone: [""],
      hospital_id: [""],
      doctor_id: [""]
    });
  }
}
