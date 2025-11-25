import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BaseServices } from '../services/base-service';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { enviroment } from '../../enviroments/enviroment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-create-medicine',
  imports: [RouterLink, RouterOutlet, 
          ReactiveFormsModule, NgClass,
          DatePipe],
  templateUrl: './create-medicine.html',
  styleUrl: './create-medicine.css',
  providers: [BaseServices]
})
export class CreateMedicine extends BaseComponent implements OnInit{

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
      "Create Medicine successful",
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
      input_date: [this.formatDateYYYYMMDD(this.today, this.locale), Validators.required],
      expire_date: [this.formatDateYYYYMMDD(this.today, this.locale), Validators.required],
      type: [""],
      price: [""]
    });
  }

}
