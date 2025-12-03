import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BaseServices } from '../services/base-service';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { enviroment } from '../../enviroments/enviroment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgClass} from '@angular/common';
import { Footer } from '../footer/footer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-medicine',
  imports: [RouterLink, RouterOutlet, 
          ReactiveFormsModule, NgClass,
          AsyncPipe, Footer],
  templateUrl: './create-medicine.html',
  styleUrl: './create-medicine.css',
  providers: [BaseServices]
})
export class CreateMedicine extends BaseComponent implements OnInit{

  medicineTypeItems?: Observable<any[]>;

  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute,
    private formBuilder: FormBuilder,
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
    var url = `${enviroment.apiUrl}/Prescriptions/MedicineTypes`;
    console.log(url);
    this.medicineTypeItems = this.baseSrv.GetItems(url);

    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      category_id: [""],
      price: [""]
    });
  }

}
