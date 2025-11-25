import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { enviroment } from '../../enviroments/enviroment';
import { AsyncPipe} from '@angular/common';
import { BaseComponent } from '../BaseComponent';
import { BaseServices } from '../services/base-service';
import { DialogService } from '../services/dialog';
import { AlertService } from '../helpers/alert-service';

@Component({
  selector: 'app-departments',
  imports: [RouterLink, RouterOutlet, AsyncPipe],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
  providers: [BaseServices]
})


export class DepartmentsComponent extends BaseComponent implements OnInit{
  
  constructor(
    protected override router: Router,
    protected override baseSrv: BaseServices,
    protected override dialogService: DialogService,
    protected override alertService: AlertService,
    protected override routerActive: ActivatedRoute
  ){
    super(
      `${enviroment.apiUrl}/Departments`,
      "Delete Department",
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
