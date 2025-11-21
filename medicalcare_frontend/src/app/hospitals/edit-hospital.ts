import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { NgClass, NgIf } from '@angular/common';
import { HospitalsService } from '../services/hospitals';
import { AlertService } from '../helpers/alert-service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { enviroment } from '../../enviroments/enviroment';
import { DialogService } from '../services/dialog';


@Component({
  selector: 'app-edit-hospital',
  imports: [NgIf, NgClass, RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './edit-hospital.html',
  styleUrl: './edit-hospital.css',
})
export class EditHospital extends BaseComponent{

  id: number = 0;

  constructor(
    public override srv: HospitalsService, 
    public override alertService: AlertService,
    public override router: Router, 
    protected override dialogService: DialogService,
    private formBuilder: FormBuilder,
    private routerActive: ActivatedRoute
  ){
    super(srv, 
      `${enviroment.apiUrl}/Hospitals`, 
      "/Hospital", 
      "Edit hospital successful",
      alertService,
      router,
      dialogService)
  }

  ngOnInit(): void{

     this.form = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.email],
      phone: [""],
      address: [""],
      description: [""],
      country: [""]
    });

    this.id = +this.routerActive.snapshot.params["id"] | 0;

    this.setFormValue();
  }

  setFormValue(){
    
    this.srv.GetItemById(this.id, this.url)
      .subscribe(item=>{
        this.form.setValue({
          name: item.name, 
          description: item.description, 
          email: item.email, 
          address: item.address, 
          phone: item.phone, 
          country: item.country
        });
    });
  }

  onsubmit(){
    this.updateItem(this.id);
  }

}
