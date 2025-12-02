import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { BaseServices } from '../services/base-service';
import { BaseComponent } from '../BaseComponent';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { enviroment } from '../../enviroments/enviroment';
import { DatePipe, formatDate, NgClass } from '@angular/common';

@Component({
  selector: 'app-treatment-modal',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './treatment-modal.html',
  styleUrl: './treatment-modal.css',
  providers: [BaseServices]
})
export class TreatmentModal extends BaseComponent implements OnInit{
  
  billing_id: number = 0;
  treatment_id: number = 0;
  title:string = "Add Treatment";
  treatmentItem?:any;

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
      `${enviroment.apiUrl}/Treatments`, 
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

    this.form = this.formBuilder.group({
      treatment_type: [""],
      description: [""],
      quantity: ["", Validators.required],
      amount: ["", Validators.required]
    });

    if (this.treatment_id > 0){
      this.title = "Edit Treatment";
      var url = `${this.apiUrl}/item`;
      this.baseSrv.GetItemById(this.treatment_id, url)
        .subscribe({
          next: (item) =>{
            this.form.setValue({
              treatment_type: item.treatment_type,
              description: item.description,
              quantity: item.quantity,
              amount: item.amount
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
    item.id = this.treatment_id;
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

      var url = `${enviroment.apiUrl}/Billings/TreatmentItem`;

      this.baseSrv.http.post(url, item, this.baseSrv.httpHeader)
      .subscribe({
          next:(data)=>{
            this.treatmentItem = data;
            this.activeModal.close(true);
          }
        }
      )
    }
  }
}

