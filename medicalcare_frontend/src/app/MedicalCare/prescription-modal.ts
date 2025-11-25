import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Medicine } from '../models/medicine';
import { Doctor } from '../models/doctor';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseComponent } from '../BaseComponent';
import { BaseServices } from '../services/base-service';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { ActivatedRoute, Router } from '@angular/router';
import { enviroment } from '../../enviroments/enviroment';
import { MedicalCareService } from '../services/medicalCare';
import { AsyncPipe, formatDate, NgClass } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prescription-modal',
  imports: [ReactiveFormsModule, AsyncPipe, NgClass],
  templateUrl: './prescription-modal.html',
  styleUrl: './prescription-modal.css',
  providers: [BaseServices]
})
export class PrescriptionModal extends BaseComponent implements OnInit{
  
  medicalcare_id: number = 0;
  prescription_id: number = 0;

  doctorItems?: Observable<Doctor[]>;
  medicineItems?:Observable<Medicine[]>;
  
  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public medicalSrv: MedicalCareService,
    @Inject(LOCALE_ID) private locale: string
  ){
    super(
      `${enviroment.apiUrl}/Prescriptions`, 
      "", 
      "",
      "",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive)
  }

  override ngOnInit(): void {

    this.medicineItems = this.baseSrv.GetItems(`${enviroment.apiUrl}/Medicines`);
    this.doctorItems = this.baseSrv.GetItems(`${enviroment.apiUrl}/Doctors`);

    this.form = this.formBuilder.group({
      medicine_id: ["", Validators.required],
      doctor_id: ["", Validators.required],
      dosage: ["", Validators.required],
      frequency: ["", Validators.required],
      start_date: [formatDate(this.today, "yyyy-MM-dd", this.locale)],
      end_date: [formatDate(this.today, "yyyy-MM-dd", this.locale)]
    });

    if (this.prescription_id > 0){
      var url = `${this.apiUrl}/item`;
      this.baseSrv.GetItemById(this.prescription_id, url)
        .subscribe({
          next: (item) =>{

            this.form.setValue({
              medicine_id: item.medicine_id,
              doctor_id: item.doctor_id,
              dosage: item.dosage,
              frequency: item.frequency,
              start_date: formatDate(item.start_date, "yyyy-MM-dd", this.locale),
              end_date: formatDate(item.end_date, "yyyy-MM-dd", this.locale)
            });
            this.detectChanges();  
          }
        })
    }
  }

  onClose(){
    this.activeModal.dismiss();
  }

  onConfirm(){
    this.submitted = true;
    if (this.form.invalid){
      return;      
    }
    var item = this.form.value;
    item.id = this.prescription_id;
    if (this.medicalcare_id > 0)
      item.medicalcare_id = this.medicalcare_id;

    if (this.prescription_id > 0){
      this.baseSrv.Update(item, this.apiUrl).subscribe({
        next:()=>{
          this.activeModal.close(true);
        },
        error: (error) =>{
          console.log(error);
        }
      });
    }
    else{
      this.baseSrv.Add(item, this.apiUrl).subscribe({
        next:()=>{
          this.activeModal.close(true);
        },
        error: (error) =>{
          console.log(error);
        }
      });
    }
  }
}
