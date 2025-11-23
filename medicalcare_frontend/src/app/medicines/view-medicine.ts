import { Component, Inject, inject, LOCALE_ID, OnInit } from '@angular/core';
import { BaseServices } from '../services/base-service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { formatDate, NgClass, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from '../BaseComponent';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { enviroment } from '../../enviroments/enviroment';

@Component({
  selector: 'app-view-medicine',
  imports: [RouterLink, RouterOutlet,
    ReactiveFormsModule,
    NgIf],
  templateUrl: './view-medicine.html',
  styleUrl: './view-medicine.css',
  providers: [BaseServices]
})
export class ViewMedicine extends BaseComponent implements OnInit{

  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) private locale: string
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
      name: [""],
      input_date: [""],
      expire_date: [""],
      type: [""],
      price: [""]
    });

    this.setFormValue();
  }

  private setFormValue(){
    var id = +this.routerActive.snapshot.params["id"] |0;
    this.baseSrv.GetItemById(id, this.apiUrl)
      .subscribe(item =>{
        this.form.setValue({
          name: item.name, 
          type: item.type, 
          price: item.price, 
          expire_date: (item.expire_date != null) ? formatDate(item.expire_date, "dd/MM/yyyy", this.locale) : "", 
          input_date: (item.input_date != null) ? formatDate(item.input_date, "dd/MM/yyyy", this.locale) : ""
        });
      },
      error=>{
        this.alertService.error(error);
      });
  }

}
