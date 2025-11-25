import { Component, OnInit } from '@angular/core';
import { BaseServices } from '../services/base-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { enviroment } from '../../enviroments/enviroment';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BaseComponent } from '../BaseComponent';
import { Hospital } from '../models/hospital';
import { Department } from '../models/department';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';

@Component({
  selector: 'app-view-doctor',
  imports: [RouterLink, RouterOutlet, 
          ReactiveFormsModule],
  templateUrl: './view-doctor.html',
  styleUrl: './view-doctor.css',
  providers: [BaseServices]
})
export class ViewDoctor extends BaseComponent implements OnInit{
 
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
      "View Doctor successful",
      "/Doctor",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive)
  }

  override ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: [""],
      last_name: [""],
      email: [""],
      phone: [""],
      gender: ["Female"],
      quanlification: [""],
      job_specification: [""],
      hospital_id: [""],
      department_id: [""]
    });

    this.setFormValue();
  }

  private setFormValue(){
    var id = +this.routerActive.snapshot.params["id"] |0;
    this.baseSrv.GetItemById(id, this.apiUrl)
      .subscribe({
        next: (item)=>{
          var hospital_id = +item.hospital_id | 0;
          var department_id = +item.department_id| 0;
          this.baseSrv.GetItems(`${enviroment.apiUrl}/Departments`)
            .subscribe(items =>{
              var departmentItem: Department = items.find(item=> item.id == department_id);

              this.baseSrv.GetItems(`${enviroment.apiUrl}/Hospitals`)
                .subscribe(items =>{
                  var hospitalItem: Hospital = items.find(item => item.id == hospital_id);

                  this.form.setValue({
                    first_name: item.first_name,
                    last_name: item.last_name,
                    email: item.email,
                    phone: item.phone,
                    gender: item.gender,
                    quanlification: item.quanlification,
                    job_specification: item.job_specification, 
                    hospital_id: (hospitalItem != null) ? hospitalItem.name : "", 
                    department_id: (departmentItem != null) ? departmentItem.name : ""
                  });
                  this.detectChanges();
                })
            })
        },
        error: (error)=>{
          this.alertService.error(error);
        }
      });
  }
}
