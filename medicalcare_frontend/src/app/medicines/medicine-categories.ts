import { Component, OnInit } from '@angular/core';
import { BaseServices } from '../services/base-service';
import { enviroment } from '../../enviroments/enviroment';
import { BaseComponent } from '../BaseComponent';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AlertService } from '../helpers/alert-service';
import { DialogService } from '../services/dialog';
import { AsyncPipe } from '@angular/common';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-medicine-categories',
  imports: [RouterOutlet, AsyncPipe, Footer, RouterLink],
  templateUrl: './medicine-categories.html',
  styleUrl: './medicine-categories.css',
  providers: [BaseServices]
})
export class MedicineCategoriesComponent extends BaseComponent implements OnInit{

  
  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute
  ){
    super(
      `${enviroment.apiUrl}/Medicines/Category`,
      "Delete Medicine Category",
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
