import { AsyncPipe, DatePipe} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BaseComponent } from '../BaseComponent';
import { BaseServices } from '../services/base-service';
import { DialogService } from '../services/dialog';
import { enviroment } from '../../enviroments/enviroment';
import { AlertService } from '../helpers/alert-service';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-medicines',
  imports: [AsyncPipe, RouterLink, RouterOutlet, DatePipe, Footer],
  templateUrl: './medicines.html',
  styleUrl: './medicines.css',
  providers: [BaseServices]
})
export class MedicinesComponent extends BaseComponent implements OnInit{

  
  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute
  ){
    super(
      `${enviroment.apiUrl}/Medicines`,
      "Delete Medicine",
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
