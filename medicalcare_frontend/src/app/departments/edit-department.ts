import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BaseServices } from '../services/base-service';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { enviroment } from '../../enviroments/enviroment';
import { AsyncPipe, NgClass} from '@angular/common';
import { Hospital } from '../models/hospital';
import { Doctor } from '../models/doctor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-department',
  imports: [RouterLink, RouterOutlet,
    ReactiveFormsModule, NgClass, AsyncPipe],
  templateUrl: './edit-department.html',
  styleUrl: './edit-department.css',
  providers: [BaseServices]
})
export class EditDepartment extends BaseComponent implements OnInit{
  
  hospitalItems?: Observable<Hospital[]>;
  doctorItems?: Observable<Doctor[]>;

  hospital_id: number = 0; 
  doctor_id: number = 0;

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
      "Edit Department successful",
      "/Department",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive)
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

    var id = +this.routerActive.snapshot.params["id"] |0;
    if (id > 0){

    }

    this.setFormValue(id);
  }

  private setFormValue(id: number){
    this.baseSrv.GetItemById(id, this.apiUrl)
      .subscribe({
        next:(item)=>{
          this.hospital_id = +item.hospital_id | 0;
          this.doctor_id = +item.doctor_id| 0;

          this.form.setValue({
            name: item.name, 
            phone: item.phone, 
            hospital_id: this.hospital_id, 
            doctor_id: this.doctor_id
          });
        },
        error:(error)=>{
          this.alertService.error(error);
        }
      });
  }

}
