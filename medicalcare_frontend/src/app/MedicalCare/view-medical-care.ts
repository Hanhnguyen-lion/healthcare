import { AsyncPipe, formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BaseServices } from '../services/base-service';
import { enviroment } from '../../enviroments/enviroment';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { BaseComponent } from '../BaseComponent';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-medical-care',
  imports: [ReactiveFormsModule, 
    AsyncPipe, RouterOutlet],
  templateUrl: './view-medical-care.html',
  styleUrl: './view-medical-care.css',
  providers:[BaseServices]
})
export class ViewMedicalCareComponent extends BaseComponent implements OnInit{
  
  months:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  currentYear: number = this.today.getFullYear();
  years:number[] = [];

  searchMedical:boolean = false;
  searchBilling:boolean = false;

  medicalCares?:any[];
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
      "/MedicalCare",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive);
  }

  override ngOnInit(): void {
    this.medicalCares = undefined;
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
      popupWin.document.title = 'Hồ sơ bệnh án';
      popupWin.document.close();
    }
  }  

  pad(n: number) {
    return (n<10 ? '0'+n : n);
  }

  onSearch(searchType: string){
    this.medicalCares = undefined;
    var url = `${enviroment.apiUrl}/MedicalCares/Search`
    var searchValue = this.form.value;
    if (searchType == "Medicalcare"){
      this.searchMedical = true;
      this.searchBilling = false;
    }
    else if (searchType == "Billing"){
      this.searchMedical = false;
      this.searchBilling = true;
      url = `${enviroment.apiUrl}/MedicalCares/Billing`
    }
    this.searchItem = this.baseSrv.SearchItems(url, searchValue);
    
    this.searchItem.subscribe({
      next: (item) =>{
        this.patientItem = item;
        var patient_id = item.patient_id;
        if (patient_id > 0){
          if (this.searchMedical)
            this.medicalCares = item.medical;
          else{
            this.medicalCares = item.billing;
            console.log(item);
            this.total = item.total;
          }
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
