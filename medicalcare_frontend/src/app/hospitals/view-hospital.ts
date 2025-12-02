import { Component, OnInit } from '@angular/core';
import { BaseServices } from '../services/base-service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { enviroment } from '../../enviroments/enviroment';
import { BaseComponent } from '../BaseComponent';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-view-hospital',
  imports: [RouterLink, RouterOutlet, 
          ReactiveFormsModule, Footer],
  templateUrl: './view-hospital.html',
  styleUrl: './view-hospital.css',
  providers: [BaseServices]
})
export class ViewHospital extends BaseComponent implements OnInit{

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
      "View hospital successful",
      "/Hospital",
      router,
      baseSrv,
      dialogService,
      alertService,
      routerActive)
  }

  override ngOnInit(): void{

     this.form = this.formBuilder.group({
      name: [""],
      email: [""],
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
        this.detectChanges();
      },
      error=>{
        this.alertService.error(error);
      });  
  }

}
