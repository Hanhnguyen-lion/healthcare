import { DatePipe, NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AlertService } from '../helpers/alert-service';
import { dateLessThanTodayValidator } from '../date-validators';
import { BaseComponent } from '../BaseComponent';
import { BaseServices } from '../services/base-service';
import { DialogService } from '../services/dialog';
import { enviroment } from '../../enviroments/enviroment';

@Component({
  selector: 'app-edit-patient',
  imports: [NgIf, RouterLink, RouterOutlet, 
      ReactiveFormsModule, 
      NgClass, DatePipe],
  templateUrl: './edit-patient.html',
  styleUrl: './edit-patient.css',
  providers: [BaseServices]
})
export class EditPatient extends BaseComponent implements OnInit{

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
      "Edit Patient successful",
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
      gender: ["", Validators.required],
      email: ["", Validators.email],
      date_of_birth: ["", Validators.required, dateLessThanTodayValidator()],
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

    this.setFormValue();

  }

  setFormValue(){
    var id = +this.routerActive.snapshot.params["id"] |0;
    this.baseSrv.GetItemById(id, this.apiUrl)
      .subscribe(item =>{
        this.form.setValue({
          code: item.code, 
          first_name: item.first_name, 
          last_name: item.last_name, 
          gender: item.gender, 
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
      },
      error=>{
        this.alertService.error(error);
      }); 

  }

}
