import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BaseServices } from '../services/base-service';
import { BaseComponent } from '../BaseComponent';
import { enviroment } from '../../enviroments/enviroment';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';

@Component({
  selector: 'app-hospitals',
  imports: [NgFor, RouterLink, RouterOutlet, AsyncPipe],
  templateUrl: './hospitals.html',
  styleUrl: './hospitals.css',
  providers: [BaseServices]
})
export class HospitalsComponent extends BaseComponent implements OnInit{

  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute
  ){
    super(
      `${enviroment.apiUrl}/Hospitals`,
      "Delete Hospital", 
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
