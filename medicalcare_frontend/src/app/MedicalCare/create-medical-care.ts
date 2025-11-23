import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseComponent } from '../BaseComponent';
import { BaseServices } from '../services/base-service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AlertService } from '../helpers/alert-service';
import { DialogService } from '../services/dialog';
import { enviroment } from '../../enviroments/enviroment';
import { DatePipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-create-medical-care',
  imports: [RouterLink, RouterOutlet,
    ReactiveFormsModule, NgIf, NgClass,
    DatePipe
  ],
  templateUrl: './create-medical-care.html',
  styleUrl: './create-medical-care.css',
    providers: [BaseServices]
})
export class CreateMedicalCare extends BaseComponent implements OnInit{

  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute,
    private formBuilder: FormBuilder
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
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      input_date: ["", Validators.required],
      expire_date: ["", Validators.required],
      type: [""],
      price: [""]
    });
  }

}
