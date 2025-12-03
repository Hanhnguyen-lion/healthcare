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
import { AsyncPipe, formatDate, NgClass } from '@angular/common';
import { first, map, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-prescription-modal',
  imports: [ReactiveFormsModule, AsyncPipe, NgClass],
  templateUrl: './prescription-modal.html',
  styleUrl: './prescription-modal.css',
  providers: [BaseServices]
})
export class PrescriptionModal extends BaseComponent implements OnInit{
  
  billing_id: number = 0;
  prescription_id: number = 0;
  new_prescription_id: number = 0;
  prescriptionItem?: any;
  title:string = "Add Treatment";

  prescriptionItemObs?:Observable<any>;

  doctorItems?: Observable<Doctor[]>;
  medicineItems?:Observable<Medicine[]>;
  medicineTypeItems?: Observable<any[]>;
  durationItems?: Observable<any[]>;
  
  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
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
    this.medicineTypeItems = this.baseSrv.GetItems(`${this.apiUrl}/MedicineTypes`);
    this.durationItems = this.baseSrv.GetItems(`${this.apiUrl}/DurationTypes`);

    this.form = this.formBuilder.group({
      medicine_id: ["", Validators.required],
      quantity: [1, Validators.required],
      duration: [1, Validators.required],
      duration_type: ["", Validators.required],
      medicine_type: ["day", Validators.required],
      dosage: [""],
      notes: [""]
    });

    this.durationItems.pipe(
      first(),
      map(arr => arr[0])
    ).subscribe({
      next: (firstElement)=>{
        this.form.patchValue({
          duration_type: firstElement.name_en
        });
      }
    });

    this.medicineTypeItems.pipe(
      first(),
      map(arr => arr[0])
    ).subscribe({
      next: (firstElement)=>{
        this.form.patchValue({
          medicine_type: firstElement.name_en
        });
      }
    });

    if (this.prescription_id > 0){
      this.title = "Edit Prescription";
      var url = `${this.apiUrl}/item`;
      this.baseSrv.GetItemById(this.prescription_id, url)
        .subscribe({
          next: (item) =>{
            this.form.setValue({
              medicine_id: item.medicine_id,
              dosage: item.dosage,
              quantity: item.quantity,
              duration: item.duration,
              duration_type: item.duration_type,
              medicine_type: item.medicine_type,
              notes: item.notes
            });
            this.detectChanges();  
          }
        });
    }
    else{
      if (this.new_prescription_id > 0){
        this.title = "Edit Prescription";
          this.prescriptionItemObs?.subscribe({
            next:(item)=>{
              this.form.setValue({
                medicine_id: item.medicine_id,
                dosage: item.dosage,
                quantity: item.quantity,
                duration: item.duration,
                duration_type: item.duration_type,
                medicine_type: item.medicine_type,
                notes: item.notes
              });
            }
          });
      }
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
    item.new_id = this.new_prescription_id;
    item.billing_id = (this.billing_id > 0) ? this.billing_id : 0;
    if (this.billing_id > 0){
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
      var url = `${enviroment.apiUrl}/Billings/PrescriptionItem`;

      this.baseSrv.http.post(url, item, this.baseSrv.httpHeader)
      .subscribe({
          next:(data)=>{
            this.prescriptionItem = data;
            this.activeModal.close(true);
          }
        }
      )
    }

    this.activeModal.close(true);
  }
}
