import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from "@angular/router";
import { AsyncPipe, DatePipe} from '@angular/common';
import { DialogService } from '../services/dialog';
import { BaseComponent } from '../BaseComponent';
import { BaseServices } from '../services/base-service';
import { enviroment } from '../../enviroments/enviroment';
import { AlertService } from '../helpers/alert-service';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-patient',
  imports: [RouterLink, RouterOutlet, 
          AsyncPipe, DatePipe, Footer],
  templateUrl: './patient.html',
  styleUrl: './patient.css',
  providers: [BaseServices]
})
export class PatientComponent extends BaseComponent implements OnInit{

  
  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override routerActive: ActivatedRoute,
    protected override alertService: AlertService
  ){
    super(
      `${enviroment.apiUrl}/Patients`,
      "Delete Patient",
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
