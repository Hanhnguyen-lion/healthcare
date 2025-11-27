import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { BaseServices } from '../services/base-service';
import { ActivatedRoute } from '@angular/router';
import { enviroment } from '../../enviroments/enviroment';
import { Patient } from '../models/patient';
import { AlertService } from '../helpers/alert-service';
import { formatDate } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-print-medical-care',
  imports: [ReactiveFormsModule],
  templateUrl: './print-medical-care.html',
  styleUrl: './print-medical-care.css',
  providers: [BaseServices]
})
export class PrintMedicalCareComponent implements OnInit{

  patientItem?:Patient;
  form: any;

  constructor(
    private baseSrv: BaseServices,
    private routerActive: ActivatedRoute,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) private locale: string
  ){

  }
  setFormValue(){
    var id = +this.routerActive.snapshot.params["id"] |0;
    console.log("id: ", id);
    var url = `${enviroment.apiUrl}/Patients`;
    this.baseSrv.GetItemById(id, url).subscribe({
      next:(item:Patient)=>{

         this.form.setValue({
          patient_code: item.code,
          insurance_type: item.insurance_type,
          job: item.job,
          office_address: item.office_address,
          home_address: item.home_address,
          gender: item.gender,
          date_of_birth: formatDate(item.date_of_birth, "dd/MM/yyyy", this.locale),
          insurance_expire: formatDate(item.insurance_expire, "dd/MM/yyyy", this.locale) ,
          patient_name: item.last_name + " " + item.first_name,
          insurance_policy_number: item.insurance_policy_number
        }); 
      }
    });
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      patient_code: [""],
      insurance_type: [""],
      job: [""],
      office_address: [""],
      home_address: [""],
      gender: [""],
      date_of_birth: [""],
      insurance_expire: [""],
      patient_name: [""],
      insurance_policy_number: [""]
    })

    this.setFormValue();
  }

  onPrint(){

  }
}
