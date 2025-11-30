import { ChangeDetectorRef, Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import { BaseServices } from '../services/base-service';
import { BaseComponent } from '../BaseComponent';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AlertService } from '../helpers/alert-service';
import { DialogService } from '../services/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { enviroment } from '../../enviroments/enviroment';
import { AsyncPipe, DecimalPipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-billing',
  imports: [ReactiveFormsModule, AsyncPipe, 
    RouterOutlet, DecimalPipe],
  templateUrl: './billing.html',
  styleUrl: './billing.css',
  providers:[BaseServices]
})
export class BillingComponent extends BaseComponent implements OnInit{
  
  months:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  currentYear: number = this.today.getFullYear();
  years:number[] = [];

  searchBilling:boolean = false;

  billing?:any[];
  searchItem?:Observable<any>;
  patientItem?:any;
  total:number = 0;

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
      `${enviroment.apiUrl}/MedicalCares/Patients`, 
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
    this.data = this.baseSrv.GetItems(this.apiUrl);

    this.setYears();

    this.form = this.formBuilder.group({
      patient_id: [0],
      visit_month: [this.today.getMonth() + 1],
      visit_year: [this.currentYear],
      DataLoaded :[""]
    });

    this.data?.subscribe(
      {
        next: (result)=>{
          var patient_id = (result) ? result[0].patient_id : 0;
          this.form.patchValue({
            patient_id: patient_id
          })
        }
      }
    );
  }

  setYears(){
    this.years.push(this.currentYear);
    for(var i = 1; i <= 20; i++){
      this.years.push(this.currentYear + i);
      this.years.push(this.currentYear - i);
    }
    this.years.sort();
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
      popupWin.document.title = 'Billing';
      popupWin.document.close();
    }
  }  

  pad(n: number) {
    return (n<10 ? '0'+n : n);
  }

  onSearch(){
    this.searchBilling = true;
    var url = `${enviroment.apiUrl}/MedicalCares/Billing`
    var searchValue = this.form.value;
    this.searchItem = this.baseSrv.SearchItems(url, searchValue);
    
    this.searchItem.subscribe({
      next: (item) =>{
        this.patientItem = item;
        var patient_id = item.patient_id;
        if (patient_id > 0){
          this.billing = item.billing;
          this.cdr.detectChanges();  
          this.form.patchValue({
            DataLoaded: "loaded"
          }); 
        }
      }
    });

  }

  formatDateToString(value: Date, format:string):string{
    return formatDate(value, format, this.locale);
  }
}
