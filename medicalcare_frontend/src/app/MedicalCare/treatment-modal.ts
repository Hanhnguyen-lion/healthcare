import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { BaseServices } from '../services/base-service';
import { BaseComponent } from '../BaseComponent';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { enviroment } from '../../enviroments/enviroment';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-treatment-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './treatment-modal.html',
  styleUrl: './treatment-modal.css',
  providers: [BaseServices]
})
export class TreatmentModal extends BaseComponent implements OnInit{
  
  medicalcare_id: number = 0;
  treatment_id: number = 0;
  title:string = "Add New Treatment";


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
      treatment_date: [formatDate(this.today, "yyyy-MM-dd", this.locale)]
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
              treatment_date: formatDate(item.treatment_date, "yyyy-MM-dd", this.locale)
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
    var item = this.form.value;
    item.id = this.treatment_id;
    if (this.medicalcare_id > 0)
      item.medicalcare_id = this.medicalcare_id;

    if (this.treatment_id > 0){
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

