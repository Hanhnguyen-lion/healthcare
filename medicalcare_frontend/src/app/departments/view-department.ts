import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { BaseServices } from '../services/base-service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { enviroment } from '../../enviroments/enviroment';
import { Hospital } from '../models/hospital';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-view-department',
  imports: [RouterLink, RouterOutlet, 
    ReactiveFormsModule],
  templateUrl: './view-department.html',
  styleUrl: './view-department.css',
  providers: [BaseServices]
})
export class ViewDepartment extends BaseComponent implements OnInit{
  
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
      "View Department successful",
      "/Department",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive)
  }

  override ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: [""],
      phone: [""],
      hospital_name: [""],
      doctor_name: [""]
    });

    this.setFormValue();
  }

  private setFormValue(){
    var id = +this.routerActive.snapshot.params["id"] |0;
    this.baseSrv.GetItemById(id, this.apiUrl)
      .subscribe({
        next:(item)=>{
          var hospital_id = +item.hospital_id | 0;
          var doctor_id = +item.doctor_id| 0;
          this.baseSrv.GetItems(`${enviroment.apiUrl}/Hospitals`)
          .subscribe({
            next:(items)=>{
              var hospitalItem: Hospital = items.find(item => item.id == hospital_id);
              var hospitalName = (hospitalItem == null) ? "" : hospitalItem.name;
              this.baseSrv.GetItems(`${enviroment.apiUrl}/Doctors`)
              .subscribe({
                next:(items)=>{
                  var doctorItem: Doctor = items.find(item => item.id == doctor_id);
                  var doctorName = (doctorItem == null) ? "" : doctorItem.last_name + " " + doctorItem.first_name;

                  this.form.setValue({
                    name: item.name,
                    phone: item.phone,
                    doctor_name: doctorName,
                    hospital_name: hospitalName
                  });
                },
                error:(error)=>{
                  this.alertService.error(error);
                }
              })
            },
            error:(error)=>{
              this.alertService.error(error);
            }
          })
        },
        error:(error)=>{
          this.alertService.error(error);
        }
      });
  }
}
