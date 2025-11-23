import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { BaseServices } from '../services/base-service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { enviroment } from '../../enviroments/enviroment';
import { DatePipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-medicine',
  imports: [RouterLink, RouterOutlet,
    ReactiveFormsModule, NgClass, DatePipe,
    NgIf
  ],
  templateUrl: './edit-medicine.html',
  styleUrl: './edit-medicine.css',
  providers: [BaseServices, DatePipe]
})
export class EditMedicine extends BaseComponent implements OnInit, AfterViewInit{
  expire_date: Date = new Date();
  input_date: Date = new Date();

  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ){
    super(
      `${enviroment.apiUrl}/Medicines`, 
      "", 
      "Edit Medicine successful",
      "/Medicine",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive)
  }
  
  formatMyDate(date: Date): string {
    var formatDate = this.datePipe?.transform(date, 'yyyy-MM-dd');
    return (formatDate != null) ? formatDate : "";
  }


  ngAfterViewInit(): void {

    this.setFormValue();
  }

  override ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      input_date: ["", Validators.required],
      expire_date: ["", Validators.required],
      type: [""],
      price: [""]
    });
  }

  private setFormValue(){
    var id = +this.routerActive.snapshot.params["id"] |0;
    this.baseSrv.GetItemById(id, this.apiUrl)
      .subscribe(item =>{
        this.expire_date = item.expire_date;
        this.input_date = item.input_date;

        this.form.setValue({
          name: item.name, 
          type: item.type, 
          price: item.price, 
          expire_date: this.expire_date, 
          input_date: this.input_date
        });
        this.detectChanges();
      },
      error=>{
        this.alertService.error(error);
      });
  }
}
