import { Component, OnInit } from '@angular/core';
import { BaseServices } from '../services/base-service';
import { BaseComponent } from '../BaseComponent';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { enviroment } from '../../enviroments/enviroment';
import { Footer } from '../footer/footer';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-add-treatment-category',
  imports: [ReactiveFormsModule, Footer, 
    RouterOutlet, RouterLink, NgClass],
  templateUrl: './add-treatment-category.html',
  styleUrl: './add-treatment-category.css',
  providers: [BaseServices]
})
export class AddTreatmentCategory extends BaseComponent implements OnInit{

  title: string = "Add Treatment Category";
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
      `${enviroment.apiUrl}/Treatments/Category`, 
      "", 
      "Create Medicine successful",
      "/Treatement/Category",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive)
  }

  override ngOnInit(): void {

    this.id = +this.routerActive.snapshot.params["id"] | 0;

    if (this.id > 0){
      this.title = "Edit Treatement Category";
    }

    this.form = this.formBuilder.group({
      name_en: ["", Validators.required],
      name_vn: [""],
      name_jp: [""],
      description: [""]
    });

    this.setFormValue();
  }

  save(){
    if (this.id > 0){
      this.updateItem();
    }
    else{
      this.addItem();
    }
  }

  private setFormValue(){
    if (this.id > 0){
      this.baseSrv.GetItemById(this.id, this.apiUrl)
        .subscribe({
          next:(item:any)=>{
            
            this.form.setValue({
              name_en: item.name_en,
              name_vn: item.name_vn,
              name_jp: item.name_jp,
              description:item.description
            });
          },
          error:(error)=>{
            this.alertService.error(error);
          }
        });
      }
  }
}
