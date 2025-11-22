import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../helpers/alert-service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { enviroment } from '../../enviroments/enviroment';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogService } from '../services/dialog';
import { BaseComponent } from '../BaseComponent';
import { BaseServices } from '../services/base-service';

@Component({
  selector: 'app-creat-hospital',
  imports: [NgIf, NgClass, FormsModule, ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './creat-hospital.html',
  styleUrl: './creat-hospital.css',
  providers: [BaseServices]
})
export class CreatHospital extends BaseComponent implements OnInit{

  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute,
    private formBuilder: FormBuilder
  ){
    super(
      `${enviroment.apiUrl}/Hospitals`, 
      "", 
      "Create hospital successful",
      "/Hospital",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive);
  }

  override ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.email],
      phone: [""],
      address: [""],
      description: [""],
      country: [""]
    });
  }

}
