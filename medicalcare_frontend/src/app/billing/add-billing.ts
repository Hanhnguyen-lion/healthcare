import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { BaseServices } from '../services/base-service';
import { enviroment } from '../../enviroments/enviroment';
import { BaseComponent } from '../BaseComponent';
import { map, Observable, tap } from 'rxjs';
import { Patient } from '../models/patient';
import { Doctor } from '../models/doctor';
import { Department } from '../models/department';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe, DatePipe, DecimalPipe, formatDate, NgClass } from '@angular/common';
import { PrescriptionModal } from '../MedicalCare/prescription-modal';
import { TreatmentModal } from '../MedicalCare/treatment-modal';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-add-billing',
  imports: [RouterOutlet, AsyncPipe, ReactiveFormsModule,
            NgClass, DatePipe, DecimalPipe, Footer],
  templateUrl: './add-billing.html',
  styleUrl: './add-billing.css',
      providers: [BaseServices]
})
export class AddBilling extends BaseComponent implements OnInit{

  patientItems?: Observable<Patient[]>;
  doctorItems?: Observable<Doctor[]>;

  departmentItems?: Observable<Department[]>;
  prescriptionItems?: Observable<any[]>;

  treatmentItems?: Observable<any[]>;

  billing_id: number = 0;

  title: string = "";

  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    @Inject(LOCALE_ID) private locale: string
  ){
    super(
      `${enviroment.apiUrl}/Billings`, 
      "", 
      "Create Billing successful",
      "/Billing",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive)
  }

  override ngOnInit(): void {

    this.billing_id = this.routerActive.snapshot.params["id"] | 0;
    this.title = (this.billing_id == 0) ? "Add Billing" : "Edit Billing";
    
    this.patientItems = this.baseSrv.GetItems(`${enviroment.apiUrl}/Patients`);
    this.departmentItems = this.baseSrv.GetItems(`${enviroment.apiUrl}/Departments`);
    this.doctorItems = this.baseSrv.GetItems(`${enviroment.apiUrl}/Doctors`);

    this.loadPrescriptions();
    this.loadTreatments();

    this.form = this.formBuilder.group({
      patient_id: ["", Validators.required],
      department_id: ["", Validators.required],
      doctor_id: ["", Validators.required],
      admission_date: [formatDate(this.today, "yyyy-MM-dd", this.locale), Validators.required],
      discharge_date: [formatDate(this.today, "yyyy-MM-dd", this.locale), Validators.required],
      diagnostic: [""],
      notes: [""]
    });

    if (this.billing_id > 0){
      this.baseSrv.GetItemById(this.billing_id, this.apiUrl)
      .subscribe({
        next:(item) =>{
          var admission_date = (item.admission_date != null)? item.admission_date:this.today;
          var discharge_date = (item.discharge_date != null)? item.discharge_date:this.today;
          this.form.setValue({
            admission_date: formatDate(admission_date, "yyyy-MM-dd", this.locale),
            discharge_date: formatDate(discharge_date, "yyyy-MM-dd", this.locale),
            patient_id: item.patient_id,
            department_id: item.department_id,
            doctor_id: item.doctor_id,
            diagnostic: item.diagnostic,
            notes: item.notes,
          });
        }
      })
    }
  }

  editPrescription(id: number){
    var activeModal = this.modalService.open(
                      PrescriptionModal, 
                      { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.prescription_id = id;
    activeModal.componentInstance.billing_id = this.billing_id;
    activeModal.closed.subscribe({
      next:(data)=>{
        this.loadPrescriptions();
      }
    })
  }

  deletePrescription(id: number, new_id: number){
    var url = `${enviroment.apiUrl}/Prescriptions`;
    this.dialogService.openConfirmDialog("Are you sure to want delete this item?", "Delete Prescription")
      .subscribe({
        next: (is_delete:boolean) =>{
          if (is_delete){
            if (id > 0){
              this.baseSrv.Delete(id, url)
              .subscribe({
                next:()=>{
                  this.loadPrescriptions();
                  this.detectChanges();
                },
                error:(error)=>{
                  console.log(error);
                }
              });
            }
            else{
              this.prescriptionItems = this.RemoveItemToObservable(this.prescriptionItems, new_id);
            }
          }
        },
        error: (error)=>{
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  deleteTreatment(id: number, new_id: number){
    var url = `${enviroment.apiUrl}/Treatments`;
    this.dialogService.openConfirmDialog(
        "Are you sure to want delete this item?", 
        "Delete Treatment")
      .subscribe({
        next: (is_delete:boolean) =>{
          if (is_delete){
            if (id > 0){
              this.baseSrv.Delete(id, url)
                .subscribe({
                  next:()=>{
                    this.loadTreatments();
                    this.detectChanges();
                  },
                  error:(error)=>{
                    console.log(error);
                  }
                });
            }
            else{
              this.treatmentItems = this.RemoveItemToObservable(this.treatmentItems, new_id);
            }
          }
        },
        error: (error)=>{
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  addOrEditTreatment(id: number, new_id: number){
    var treatmentItem = this.treatmentItems?.pipe(
      map(items => items.find(item => item.new_id === new_id)));

    var activeModal = this.modalService.open(
                      TreatmentModal, 
                      { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.treatmentItemObs = treatmentItem;

    activeModal.componentInstance.treatment_id = id;
    activeModal.componentInstance.new_treatment_id = new_id;
    activeModal.componentInstance.billing_id = this.billing_id;
    
    activeModal.closed.subscribe({
      next:(isClose:boolean)=>{
          if (isClose){
            if (this.billing_id > 0){
              this.loadTreatments();
            }
            else{
              var treatmentItem = activeModal.componentInstance.treatmentItem;
              if (treatmentItem != null){
                this.treatmentItems = this.AddItemToObservable(this.treatmentItems, treatmentItem);
              }
            }
          }
      }
    });
  }

  private AddItemToObservable(
    items: Observable<any[]>|undefined, 
    item: any): Observable<any[]>|undefined{
    if (items != null){
      items = items?.pipe(
        map(arr => {
          var index = arr.findIndex(li => li.new_id == item.new_id);
          var newItems = [...arr];
          if (index != -1){
            newItems[index] = item;
            return newItems;
          }
          return [...arr, item];
        })
      );
    }
    return items;
  }

  private RemoveItemToObservable(
    items: Observable<any[]>|undefined, 
    id: number): Observable<any[]>|undefined{

    return items?.pipe(
      map((arra: any[]) => {
        // Create a new array excluding the item with the specified ID
        return arra.filter((item) => item.new_id !== id);
      }));      
  }

  addOrEditPrescription(id: number, new_id: number){
    var prescriptionItem = this.prescriptionItems?.pipe(
      map(items => items.find(item => item.new_id === new_id)));

      var activeModal = this.modalService.open(
                      PrescriptionModal, 
                      { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.prescription_id = id;
    activeModal.componentInstance.billing_id = this.billing_id;
    activeModal.componentInstance.prescriptionItemObs = prescriptionItem;
    activeModal.componentInstance.new_prescription_id = new_id;

    activeModal.closed.subscribe({
      next:(isClose:boolean)=>{
        if (isClose){
          if (this.billing_id > 0){
            this.loadPrescriptions();
          }
          else{
            var prescriptionItem = activeModal.componentInstance.prescriptionItem;
            if (prescriptionItem != null){
              this.prescriptionItems = this.AddItemToObservable(this.prescriptionItems, prescriptionItem);
            }
          }
        }
      }
    });
  }

  addOrEditItem(){
    this.submitted = true;
    if (this.form.invalid){
      return;
    }
    this.loading = true;
    
    if (this.billing_id > 0){
      this.updateItem();
    }
    else{
      var item = this.form.value;
      var url = `${this.apiUrl}/Add`;
      this.baseSrv.http.post<any>(url, item, this.baseSrv.httpHeader)
        .subscribe({
          next:(id:number)=>{
            this.treatmentItems?.subscribe({
                  next:(data: any[])=>{
                    url = `${this.apiUrl}/Add/Treatement/${id}`;
                    this.baseSrv.http.post<any>(url, data, this.baseSrv.httpHeader)
                    .subscribe(()=>{
                      this.prescriptionItems?.subscribe({
                            next:(data: any[])=>{
                              url = `${this.apiUrl}/Add/Prescription/${id}`;
                              this.baseSrv.http.post<any>(url, data, this.baseSrv.httpHeader)
                              .subscribe(()=>{
                                  this.navigateTo(this.navigateByUrl);
                              });
                            }
                          });
                    });
                  }
                });
          }
        });
      }
  }

  cancel(){
    this.navigateTo(this.navigateByUrl);
  }

  private loadPrescriptions(){
      var url = `${enviroment.apiUrl}/Prescriptions/items/${this.billing_id}`;

      this.prescriptionItems = this.baseSrv.GetItems(url);
  }

  private loadTreatments(){
      var url = `${enviroment.apiUrl}/Treatments/items/${this.billing_id}`;
      this.treatmentItems = this.baseSrv.GetItems(url);
  }

}
