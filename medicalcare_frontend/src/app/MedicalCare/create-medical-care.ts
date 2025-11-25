import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseComponent } from '../BaseComponent';
import { BaseServices } from '../services/base-service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AlertService } from '../helpers/alert-service';
import { DialogService } from '../services/dialog';
import { enviroment } from '../../enviroments/enviroment';
import { AsyncPipe, DatePipe, formatDate, NgClass} from '@angular/common';
import { Patient } from '../models/patient';
import { Doctor } from '../models/doctor';
import { Department } from '../models/department';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrescriptionModal } from './prescription-modal';
import { MedicalCareService } from '../services/medicalCare';
import { Observable } from 'rxjs';
import { TreatmentModal } from './treatment-modal';

@Component({
  selector: 'app-create-medical-care',
  imports: [RouterLink, RouterOutlet,
    ReactiveFormsModule, NgClass,
    DatePipe, AsyncPipe
  ],
  templateUrl: './create-medical-care.html',
  styleUrl: './create-medical-care.css',
    providers: [BaseServices]
})
export class CreateMedicalCare extends BaseComponent implements OnInit{

  patientItems?: Observable<Patient[]>;
  doctorItems?: Observable<Doctor[]>;

  departmentItems?: Observable<Department[]>;
  prescriptionItems?: Observable<any[]>;

  treatmentItems?: Observable<any[]>;

  medicalcare_id: number = 0;

  title: string = "";

  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public medicalSrv: MedicalCareService,
    @Inject(LOCALE_ID) private locale: string
  ){
    super(
      `${enviroment.apiUrl}/MedicalCares`, 
      "", 
      "Create Medical Care successful",
      "/MedicalCare",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive)
  }

  override ngOnInit(): void {

    this.medicalcare_id = this.routerActive.snapshot.params["id"] | 0;
    this.title = (this.medicalcare_id == 0) ? "Add New Medical Care" : "Edit Medical Care";
    
    this.patientItems = this.baseSrv.GetItems(`${enviroment.apiUrl}/Patients`);
    this.departmentItems = this.baseSrv.GetItems(`${enviroment.apiUrl}/Departments`);
    this.doctorItems = this.baseSrv.GetItems(`${enviroment.apiUrl}/Doctors`);

    this.loadPrescriptions();
    this.loadTreatments();

    this.form = this.formBuilder.group({
      visit_date: [formatDate(this.today, "yyyy-MM-dd", this.locale), Validators.required],
      patient_id: ["", Validators.required],
      department_id: ["", Validators.required],
      doctor_id: ["", Validators.required],
      start_date: [formatDate(this.today, "yyyy-MM-dd", this.locale), Validators.required],
      end_date: [formatDate(this.today, "yyyy-MM-dd", this.locale), Validators.required],
      diagnostic: [""],
      notes: [""]
    });

    if (this.medicalcare_id > 0){
      this.baseSrv.GetItemById(this.medicalcare_id, this.apiUrl)
      .subscribe({
        next:(item) =>{
          var visit_date = (item.visit_date != null)? item.visit_date:this.today;
          var start_date = (item.start_date != null)? item.start_date:this.today;
          var end_date = (item.end_date != null)? item.end_date:this.today;
          this.form.setValue({
            visit_date: formatDate(visit_date, "yyyy-MM-dd", this.locale),
            patient_id: item.patient_id,
            department_id: item.department_id,
            doctor_id: item.doctor_id,
            start_date: formatDate(start_date, "yyyy-MM-dd", this.locale),
            end_date: formatDate(end_date, "yyyy-MM-dd", this.locale),
            diagnostic: item.diagnostic,
            notes: item.notes
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
    activeModal.componentInstance.medicalcare_id = this.medicalcare_id;
    activeModal.closed.subscribe({
      next:(data)=>{
        this.loadPrescriptions();
      }
    })
  }

  deletePrescription(id: number){
    var url = `${enviroment.apiUrl}/Prescriptions`;
    this.dialogService.openConfirmDialog("Are you sure to want delete this item?", "Delete Prescription")
      .subscribe({
        next: () =>{
          this.baseSrv.Delete(id, url)
          .subscribe({
            next:()=>{
              this.loadPrescriptions();
              this.detectChanges();
            },
            error:(error)=>{
              this.alertService.error(error);
            }
          });
        },
        error: (error)=>{
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  deleteTreatment(id: number){
    var url = `${enviroment.apiUrl}/Treatments`;
    this.dialogService.openConfirmDialog("Are you sure to want delete this item?", "Delete Treatment")
      .subscribe({
        next: () =>{
          this.baseSrv.Delete(id, url)
          .subscribe({
            next:()=>{
              this.loadTreatments();
              this.detectChanges();
            },
            error:(error)=>{
              this.alertService.error(error);
            }
          });
        },
        error: (error)=>{
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  addOrEditTreatment(id: number){
    var activeModal = this.modalService.open(
                      TreatmentModal, 
                      { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.treatment_id = id;
    activeModal.componentInstance.medicalcare_id = this.medicalcare_id;
    activeModal.closed.subscribe({
      next:(data)=>{
        this.loadTreatments();
      }
    });
  }

  addOrEditPrescription(id: number){
    var activeModal = this.modalService.open(
                      PrescriptionModal, 
                      { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.prescription_id = id;
    activeModal.componentInstance.medicalcare_id = this.medicalcare_id;
    activeModal.closed.subscribe({
      next:(data)=>{
        this.loadPrescriptions();
      }
    });
  }

  addOrEditItem(){
    if (this.medicalcare_id > 0){
      this.updateItem();
    }
    else{
      this.addItem();
    }
  }

  private loadPrescriptions(){
      var url = `${enviroment.apiUrl}/Prescriptions/items/${this.medicalcare_id}`;

      this.prescriptionItems = this.baseSrv.GetItems(url);
  }

  private loadTreatments(){
      var url = `${enviroment.apiUrl}/Treatments/items/${this.medicalcare_id}`;
      this.treatmentItems = this.baseSrv.GetItems(url);
  }

}
