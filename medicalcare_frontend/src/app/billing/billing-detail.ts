import { ChangeDetectorRef, Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { BaseServices } from '../services/base-service';
import { DecimalPipe, formatDate } from '@angular/common';
import { enviroment } from '../../enviroments/enviroment';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseComponent } from '../BaseComponent';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-billing-detail',
  imports: [ReactiveFormsModule, RouterOutlet, DecimalPipe, Footer],
  templateUrl: './billing-detail.html',
  styleUrl: './billing-detail.css',
  providers:[BaseServices]
})
export class BillingDetail extends BaseComponent implements OnInit{
  
  
  prescriptionItems?:any[];
  treatmemtItems?:any[];
  billingDetail?:Observable<any>;
  patientItem?:any;
  billingItem?:any;
  total:number = 0;
  billing_id: number = 0;

  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    @Inject(LOCALE_ID) private locale: string
  ){
    super(
      `${enviroment.apiUrl}/Billings/BillingDetail`, 
      "", 
      "",
      "/Billing",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive);
  }

  override ngOnInit(): void {
      this.billing_id = this.routerActive.snapshot.params["id"] | 0;
      this.getBillingDetail();
  }


  onPrint() {
    var printContents = document.getElementById('MedicalReports')?.innerHTML;
    var popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    if (popupWin){
      popupWin.document.open();
      popupWin.document.write(`<html><head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/scss/mixins/_utilities.scss" rel="stylesheet" type="text/css"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/scss/_tables.scss" rel="stylesheet" type="text/css"/>
        <style>
            .my-double-bordered-table {
              border: 3px double black;
            }
            .alnright{
                text-align: right;
            }
            .alncenter{
                text-align: center;
            }
            .alnleft{
                text-align: left;
            }
            .borderleft{
                border-left: 1px solid black;
            }
            .borderright{
                border-right: 1px solid black;
            }
            .borderleft-double{
                border-left: 3px double black;
            }
            .borderbottom{
                border-bottom: 1px solid black;
            }
            .bordertop{
                border-top: 1px solid black;
            }
            .bordertop-double{
                border-top: 3px double black;
            }              
          </style> 
        </head><body onload="window.print();window.close()">${printContents}</body></html>`);
      popupWin.document.title = 'Billing Detail';
      popupWin.document.close();
    }
  }  

  getBillingDetail(){
    this.billingDetail = this.baseSrv.GetItemById(this.billing_id, this.apiUrl);
    this.billingDetail.subscribe({
      next: (item) =>{
        console.log("item: ", item);
        this.patientItem = item;
        var patient_id = item.patient_id;
        if (patient_id > 0){
          this.prescriptionItems = item.prescriptions;
          this.treatmemtItems = item.treatments;
          this.billingItem = item.billing;
          this.cdr.detectChanges();  
        }
      }
    });

  }

  formatDateToString(value: Date, format:string):string{
    return formatDate(value, format, this.locale);
  }

  onBillingList(){
    this.router.navigateByUrl("/Billing");
  }

}
