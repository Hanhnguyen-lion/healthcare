import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BaseComponent } from '../BaseComponent';
import { BaseServices } from '../services/base-service';
import { DialogService } from '../services/dialog';
import { enviroment } from '../../enviroments/enviroment';
import { AlertService } from '../helpers/alert-service';

@Component({
  selector: 'app-doctors',
  imports: [RouterLink, RouterOutlet, NgFor, AsyncPipe],
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
  providers: [BaseServices]
})
export class DoctorsCompnonent extends BaseComponent implements OnInit{
  
  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute
  ){
    super(
      `${enviroment.apiUrl}/Doctors`,
      "",
      "",
      "Delete Doctor", 
      router, 
      baseSrv,
      dialogService,
      alertService,
      routerActive
    );
  }
}
