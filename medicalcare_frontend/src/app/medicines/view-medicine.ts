import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { BaseServices } from '../services/base-service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { formatDate} from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from '../BaseComponent';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { enviroment } from '../../enviroments/enviroment';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-view-medicine',
  imports: [RouterLink, RouterOutlet,
    ReactiveFormsModule, Footer],
  templateUrl: './view-medicine.html',
  styleUrl: './view-medicine.css',
  providers: [BaseServices]
})
export class ViewMedicine extends BaseComponent implements OnInit{

  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) private locale: string
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
    this.form = this.formBuilder.group({
      name: [""],
      medicine_type: [""],
      price: [""]
    });

    this.setFormValue();
  }

  private setFormValue(){
    var id = +this.routerActive.snapshot.params["id"] |0;
    this.baseSrv.GetItemById(id, this.apiUrl)
      .subscribe({
        next: (item) =>{
          this.form.setValue({
            name: item.name, 
            medicine_type: item.medicine_type, 
            price: item.price
          });
        },
        error: (error) =>{
          this.alertService.error(error);
        }
      })
  }

}
