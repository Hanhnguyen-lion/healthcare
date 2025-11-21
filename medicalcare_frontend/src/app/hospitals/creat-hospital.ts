import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { HospitalsService } from '../services/hospitals';
import { AlertService } from '../helpers/alert-service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { enviroment } from '../../enviroments/enviroment';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogService } from '../services/dialog';

@Component({
  selector: 'app-creat-hospital',
  imports: [NgIf, NgClass, FormsModule, ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './creat-hospital.html',
  styleUrl: './creat-hospital.css',
})
export class CreatHospital extends BaseComponent{

  constructor(
    public override srv: HospitalsService, 
    public override alertService: AlertService,
    public override router: Router, 
    protected override dialogService: DialogService,
    private formBuilder: FormBuilder
  ){
    super(srv, 
      `${enviroment.apiUrl}/Hospitals`, 
      "/Hospital", 
      "Create hospital successful",
      alertService,
      router,
    dialogService)
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.email],
      phone: [""],
      address: [""],
      description: [""],
      country: [""]
    });
  }

  onsubmit(){
    this.addItem();
  }

}
