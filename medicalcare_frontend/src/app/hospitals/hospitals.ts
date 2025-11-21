import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Hospital } from '../models/hospital';
import { HospitalsService } from '../services/hospitals';
import { BaseComponent } from '../BaseComponent';
import { AlertService } from '../helpers/alert-service';
import { enviroment } from '../../enviroments/enviroment';
import { DialogService } from '../services/dialog';

@Component({
  selector: 'app-hospitals',
  imports: [NgFor, RouterLink, RouterOutlet, AsyncPipe],
  templateUrl: './hospitals.html',
  styleUrl: './hospitals.css',
})
export class HospitalsComponent extends BaseComponent{

  hospitals?:Observable<Hospital[]>;
  hospitals_1?:Observable<Hospital[]>;

  constructor(
    public override srv: HospitalsService, 
    public override alertService: AlertService,
    public override router: Router, 
    protected override dialogService: DialogService
  ){
    super(
        srv, 
        `${enviroment.apiUrl}/Hospitals`, 
        "/Hospital", 
        "Get hospital list successful",
        alertService,
        router,
        dialogService);
  }

  ngOnInit(): void {
    this.getHospitals();
  }

  getHospitals(){
    this.hospitals_1 = this.srv.GetItems(this.url);
    this.hospitals = this.hospitals_1;
  }

  onDelete(id: number){
    this.deleteItem(id, "Delete Hospital", ()=>{
    this.getHospitals();
    });
  }
}
