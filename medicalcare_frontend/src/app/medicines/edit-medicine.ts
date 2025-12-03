import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { BaseServices } from '../services/base-service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { enviroment } from '../../enviroments/enviroment';
import { AsyncPipe, DatePipe, NgClass} from '@angular/common';
import { Footer } from '../footer/footer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-medicine',
  imports: [RouterLink, RouterOutlet,
    ReactiveFormsModule, NgClass, Footer, AsyncPipe
  ],
  templateUrl: './edit-medicine.html',
  styleUrl: './edit-medicine.css',
  providers: [BaseServices, DatePipe]
})
export class EditMedicine extends BaseComponent implements OnInit{

  medicineTypeItems?: Observable<any[]>;

  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute,
    private formBuilder: FormBuilder
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
    var url = `${enviroment.apiUrl}/Prescriptions/MedicineTypes`;
    console.log(url);
    this.medicineTypeItems = this.baseSrv.GetItems(url);

    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      category_id: [""],
      price: [""]
    });
    
    this.setFormValue();
  }

  private setFormValue(){
    var id = +this.routerActive.snapshot.params["id"] |0;
    this.baseSrv.GetItemById(id, this.apiUrl)
      .subscribe({
        next:(item)=>{
          
          this.form.setValue({
            name: item.name, 
            category_id: item.category_id, 
            price: item.price
          });
        },
        error:(error)=>{
          this.alertService.error(error);
        }
      })
  }
}
