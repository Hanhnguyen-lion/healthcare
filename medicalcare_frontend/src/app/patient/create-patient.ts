import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { dateLessThanTodayValidator } from '../date-validators';
import { AlertService } from '../helpers/alert-service';
import { DatePipe, NgClass} from '@angular/common';
import { BaseComponent } from '../BaseComponent';
import { BaseServices } from '../services/base-service';
import { DialogService } from '../services/dialog';
import { enviroment } from '../../enviroments/enviroment';

@Component({
  selector: 'app-create-patient',
  imports: [RouterLink, RouterOutlet, FormsModule, 
    ReactiveFormsModule, DatePipe, NgClass],
  templateUrl: './create-patient.html',
  styleUrl: './create-patient.css',
  providers: [BaseServices]
})
export class CreatePatient extends BaseComponent implements OnInit{

  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute,
    private formBuilder: FormBuilder
  ){
    super(
      `${enviroment.apiUrl}/Patients`, 
      "", 
      "Create Patient successful",
      "/Patient",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive)
  }

  override ngOnInit(): void {
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

}
