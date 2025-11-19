import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PatientsService } from '../services/patient';
import { dateLessThanTodayValidator } from '../date-validators';
import { AlertService } from '../helpers/alert-service';
import { DatePipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-create-patient',
  imports: [RouterLink, RouterOutlet, FormsModule, ReactiveFormsModule, DatePipe, NgIf, NgClass],
  templateUrl: './create-patient.html',
  styleUrl: './create-patient.css',
})
export class CreatePatient implements OnInit{

  loading = false;
  submitted = false;
  form: any;
  today: Date = new Date();

  constructor(
    private patientService: PatientsService,
    private alertService: AlertService,
    private router: Router,
    private formBuilder: FormBuilder
  ){

  }
  
  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: ["", Validators.required],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      date_of_birth: ["", Validators.required, dateLessThanTodayValidator()],
      email: ["", Validators.email],
      gender: ["Female", Validators.required],
      home_address: [""],
      office_address: [""],
      phone_number: [""],
      job: [""],
      emergency_contact_name: [""],
      emergency_contact_phone: [""],
      insurance_type: [""],
      insurance_policy_number: [""],
      insurance_provider: [""],
      insurance_expire: [""],
      insurance_info: [""],
      medical_history: [""]
    });
  }

  onsubmit(){

    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid){
      return;
    }

    this.loading = true;

    var item = this.form.value;

    this.patientService.Add(item)
    .subscribe(
      (data) =>{
        this.alertService.success('Create patient successful, please check your email for verification instructions', { keepAfterRouteChange: true });
        this.router.navigate(['/Patient']);
      }, 
      error =>{
        this.alertService.error(error);
        this.loading = false;
      }

    )
    
  }

}
