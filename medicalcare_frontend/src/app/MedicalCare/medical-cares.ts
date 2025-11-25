import { Component, OnInit } from '@angular/core';
import { BaseServices } from '../services/base-service';
import { BaseComponent } from '../BaseComponent';
import { enviroment } from '../../enviroments/enviroment';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';
import { AsyncPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-medical-cares',
  imports: [RouterLink, RouterOutlet, 
            DatePipe, AsyncPipe],
  templateUrl: './medical-cares.html',
  styleUrl: './medical-cares.css',
    providers: [BaseServices]
})
export class MedicalCaresComponent extends BaseComponent implements OnInit {
  
  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute
  ){
    super(
      `${enviroment.apiUrl}/MedicalCares`,
      "Delete MedicalCare",
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
