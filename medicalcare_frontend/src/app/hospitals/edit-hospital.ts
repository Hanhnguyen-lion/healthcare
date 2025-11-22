import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { AlertService } from '../helpers/alert-service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { enviroment } from '../../enviroments/enviroment';
import { DialogService } from '../services/dialog';
import { BaseComponent } from '../BaseComponent';
import { BaseServices } from '../services/base-service';


@Component({
  selector: 'app-edit-hospital',
  imports: [NgIf, NgClass, RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './edit-hospital.html',
  styleUrl: './edit-hospital.css',
  providers: [BaseServices]
})
export class EditHospital extends BaseComponent implements OnInit{

  id: number = 0;

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
      "Edit hospital successful",
      "/Hospital",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive)
  }

  override ngOnInit(): void{

     this.form = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.email],
      phone: [""],
      address: [""],
      description: [""],
      country: [""]
    });

    this.setFormValue();
  }

  setFormValue(){
    var id = +this.routerActive.snapshot.params["id"] |0;
    this.baseSrv.GetItemById(id, this.apiUrl)
      .subscribe(item =>{
        this.form.setValue({
          name: item.name, 
          description: item.description, 
          email: item.email, 
          address: item.address, 
          phone: item.phone, 
          country: item.country
        });
      },
      error=>{
        this.alertService.error(error);
      });  
  }
}
