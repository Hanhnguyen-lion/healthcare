import { Component } from '@angular/core';

@Component({
  selector: 'app-medical-records',
  imports: [],
  templateUrl: './medical-records.html',
  styleUrl: './medical-records.css',
})
export class MedicalRecords {

  onPrint() {
    var printContents = document.getElementById('MedicalReports')?.innerHTML;
    var popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    if (popupWin){
      popupWin.document.open();
      popupWin.document.write(`<html><head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/scss/mixins/_utilities.scss" rel="stylesheet" type="text/css"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/scss/_tables.scss" rel="stylesheet" type="text/css"/>
        <style>

.form-control-plaintext {
  display: block;
  width: 100%;
  padding: .375rem 0;
  margin-bottom: 0;
  line-height: 1.5;
  color: #212529;
  background-color:transparent;
  border: solid transparent;
  border-width: 1 0;

  &:focus {
    outline: 0;
  }

  &.form-control-sm,
  &.form-control-lg {
    padding-right: 0;
    padding-left: 0;
  }
}
          .form-control-plaintext {
              display: block;
              width: 100%;
              padding: .375rem 0;
              margin-bottom: 0;
              line-height: 1.5;
              color: #212529;
              background-color: transparent;
              border: solid transparent;
              border-width: 1px 0;
          }
                .my-double-bordered-table {
              border-top: 3px double black; /* Adjust thickness and color as needed */
              border-bottom: 3px double black; /* Adjust thickness and color as needed */
            }

            .my-double-bordered-table th,
            .my-double-bordered-table td {
              border: none;
            }
              </style> 
        </head><body onload="window.print();window.close()">${printContents}</body></html>`);
      popupWin.document.title = 'Hồ sơ bệnh án';
      popupWin.document.close();
    }
  }  

}
