import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../services/patient';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { Patient } from '../models/patient';
import { AlertService } from '../helpers/alert-service';

@Component({
  selector: 'app-view-patient',
  imports: [NgIf, RouterLink, RouterOutlet, ReactiveFormsModule, DatePipe],
  templateUrl: './view-patient.html',
  styleUrl: './view-patient.css',
})
export class ViewPatient implements OnInit{

  form: any;
  submitted = false;
  loading = false;
  today = new Date();

  patientId: number = 0;

  dob:Date = new Date();
  insuranceExpire:Date = new Date();

  constructor(
    private patientService: PatientsService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private routerActive: ActivatedRoute
  ){

  }

  get f(){return this.form.controls;}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      code: [""],
      first_name: [""],
      last_name: [""],
      gender: [""],
      email: [""],
      date_of_birth: [""],
      job: [""],
      home_address: [""],
      office_address: [""],
      phone_number: [""],
      emergency_contact_name: [""],
      emergency_contact_phone: [""],
      insurance_type: [""],
      insurance_policy_number: [""],
      insurance_provider: [""],
      insurance_expire: [""],
      insurance_info: [""],
      medical_history: [""]
    });

    this.patientId = +this.routerActive.snapshot.params["id"] | 0;

    this.getPatientById(this.patientId);

  }

  getPatientById(id: number){
    this.patientService.GetPatientById(id)
    .subscribe((item)=>{
      this.setFormValue(item);
    },
    error=>{
      this.alertService.error(error);
    });
  }

  setFormValue(item: Patient){
    var gender = (item.gender) ? item.gender : "Female";
    this.dob = (item.date_of_birth) ? item.date_of_birth : new Date();
    this.insuranceExpire = (item.insurance_expire) ? item.insurance_expire : new Date();

    this.form.setValue({
      code: item.code, 
      first_name: item.first_name, 
      last_name: item.last_name, 
      gender: gender, 
      email: item.email, 
      date_of_birth: item.date_of_birth, 
      phone_number: item.phone_number, 
      home_address: item.home_address, 
      office_address: item.office_address, 
      job: item.job, 
      insurance_expire: item.insurance_expire, 
      insurance_info: item.insurance_info, 
      insurance_policy_number: item.insurance_policy_number, 
      insurance_type: item.insurance_type, 
      insurance_provider: item.insurance_provider, 
      emergency_contact_name: item.emergency_contact_name, 
      emergency_contact_phone: item.emergency_contact_phone, 
      medical_history: item.medical_history
    });
  }
  onEdit(){
    var url = `/Patient/Edit/${this.patientId}`;
    this.router.navigateByUrl(url)
  }
}
