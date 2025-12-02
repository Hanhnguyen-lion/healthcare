import { Component, OnInit} from '@angular/core';
import { BaseServices } from '../services/base-service';
import { BaseComponent } from '../BaseComponent';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AlertService } from '../helpers/alert-service';
import { DialogService } from '../services/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { enviroment } from '../../enviroments/enviroment';
import { AsyncPipe, DatePipe, DecimalPipe} from '@angular/common';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-billing',
  imports: [ReactiveFormsModule, AsyncPipe, 
    RouterOutlet, DatePipe, RouterLink, DecimalPipe, Footer],
  templateUrl: './billing.html',
  styleUrl: './billing.css',
  providers:[BaseServices]
})
export class BillingComponent extends BaseComponent implements OnInit{
  
  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute
  ){
    super(
      `${enviroment.apiUrl}/Billings`,
      "Delete Billing",
      "",
      "", 
      router, 
      baseSrv,
      dialogService,
      alertService,
      routerActive
    );
  }
}
