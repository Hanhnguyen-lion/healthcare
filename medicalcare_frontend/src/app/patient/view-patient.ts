import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { formatDate} from '@angular/common';
import { AlertService } from '../helpers/alert-service';
import { BaseServices } from '../services/base-service';
import { enviroment } from '../../enviroments/enviroment';
import { BaseComponent } from '../BaseComponent';
import { DialogService } from '../services/dialog';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-view-patient',
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, Footer],
  templateUrl: './view-patient.html',
  styleUrl: './view-patient.css',
  providers: [BaseServices]
})
export class ViewPatient extends BaseComponent implements OnInit{

  formatInsuranceExpire:string = "";

  formatDob: string = "";

  constructor(
    @Inject(LOCALE_ID) private locale: string,
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
      "View Patient successful",
      "/Patient",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive)
  }

  override ngOnInit(): void {

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

    this.setFormValue();

  }

  setFormValue(){
    var id = +this.routerActive.snapshot.params["id"] |0;
    this.baseSrv.GetItemById(id, this.apiUrl)
      .subscribe({
        next:(item) =>{
          var gender = (item.gender) ? item.gender : "Female";
          var dob = (item.date_of_birth) ? item.date_of_birth : null;
          var insuranceExpire = (item.insurance_expire) ? item.insurance_expire : null;
          this.formatDob = (dob == null) ? "" : formatDate(dob, 'dd/MM/yyyy', this.locale);
          this.formatInsuranceExpire = (insuranceExpire == null) ? "" : formatDate(insuranceExpire, "dd/MM/yyyy", this.locale);

          this.form.setValue({
            code: item.code, 
            first_name: item.first_name, 
            last_name: item.last_name, 
            gender: gender, 
            email: item.email, 
            date_of_birth: this.formatDob, 
            phone_number: item.phone_number, 
            home_address: item.home_address, 
            office_address: item.office_address, 
            job: item.job, 
            insurance_expire: this.formatInsuranceExpire, 
            insurance_info: item.insurance_info, 
            insurance_policy_number: item.insurance_policy_number, 
            insurance_type: item.insurance_type, 
            insurance_provider: item.insurance_provider, 
            emergency_contact_name: item.emergency_contact_name, 
            emergency_contact_phone: item.emergency_contact_phone, 
            medical_history: item.medical_history
          });
        },
        error: (error)=>{
          this.alertService.error(error);
        }
      })
  }
}
