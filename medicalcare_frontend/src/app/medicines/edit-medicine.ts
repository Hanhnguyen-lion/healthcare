import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { BaseServices } from '../services/base-service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { enviroment } from '../../enviroments/enviroment';
import { DatePipe, formatDate, NgClass} from '@angular/common';

@Component({
  selector: 'app-edit-medicine',
  imports: [RouterLink, RouterOutlet,
    ReactiveFormsModule, NgClass
  ],
  templateUrl: './edit-medicine.html',
  styleUrl: './edit-medicine.css',
  providers: [BaseServices, DatePipe]
})
export class EditMedicine extends BaseComponent implements OnInit{

  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) private locale:string
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
  
  override ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      input_date: [formatDate(this.today, "yyyy-MM-dd", this.locale), Validators.required],
      expire_date: [formatDate(this.today, "yyyy-MM-dd", this.locale), Validators.required],
      type: [""],
      price: [""]
    });
    
    this.setFormValue();
  }

  private setFormValue(){
    var id = +this.routerActive.snapshot.params["id"] |0;
    this.baseSrv.GetItemById(id, this.apiUrl)
      .subscribe({
        next:(item)=>{
          var input_date = (item.input_date != null) ? item.input_date: this.today;  
          var expire_date = (item.expire_date != null) ? item.expire_date: this.today;  
          
          this.form.setValue({
            name: item.name, 
            input_date: this.formatDateYYYYMMDD(input_date, this.locale), 
            expire_date: this.formatDateYYYYMMDD(expire_date, this.locale), 
            type: item.type, 
            price: item.price
          });
        },
        error:(error)=>{
          this.alertService.error(error);
        }
      })
  }
}
