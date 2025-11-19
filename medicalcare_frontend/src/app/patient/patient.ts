import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { PatientsService } from '../services/patient';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';
import { AsyncPipe, DatePipe, NgFor } from '@angular/common';
import { DialogService } from '../services/dialog';

@Component({
  selector: 'app-patient',
  imports: [RouterLink, RouterOutlet, NgFor, AsyncPipe, DatePipe],
  templateUrl: './patient.html',
  styleUrl: './patient.css',
})
export class PatientComponent implements OnInit{

  patients? : Observable<Patient[]>;
  patients_1? : Observable<Patient[]>;

  constructor(
    private patientsService: PatientsService,
    private dialogService: DialogService
  ){

  }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void{
    this.patients_1 = this.patientsService.GetPatients();
    this.patients = this.patients_1;;
  }

  onDelete(id: number){
    this.dialogService.openConfirmDialog("Are you sure to want delete this item?", "Delete Patient")
    .subscribe((result)=>{
      if (result){
        this.patientsService.Delete(id)
        .subscribe(
          ()=>{
            this.getPatients();    
          },
        (error)=>{
          console.log("Delete Patient Error");
        })
      }
    })
  }

}
