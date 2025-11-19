import { Component} from '@angular/core';

@Component({
  selector: 'app-billing',
  imports: [],
  templateUrl: './billing.html',
  styleUrl: './billing.css'
})
export class Billing{

  printInvoice() {
    var printContents = document.getElementById('billing')?.innerHTML;
    var popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    if (popupWin){
      popupWin.document.open();
      popupWin.document.write(`<html><head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css"/><style></style> </head><body onload="window.print();window.close()">${printContents}</body></html>`);
      // popupWin.document.write(`<html><head><style>${this.styleSheet}</style></head><body onload="window.print();window.close();">${printContents}</body></html>`);
      popupWin.document.title = 'Medical Billing';
      popupWin.document.close();
    }
  }  
  
  onPrint(){
    let printContents, popupWin;
		printContents = document.getElementById('billing')?.innerHTML;
		popupWin = window.open('aaa', '_blank', 'top=0,left=0,height=100%,width=auto');
		if(popupWin){
			popupWin.document.open();
			popupWin.document.write(`
				<html>
					<head>
						<title>Medical Billing</title>
            						<style type="text/css">
.fw-bold {
    font-weight: 700 !important;
}
.mb-3 {
    margin-bottom: 1rem !important;
}
.align-items-center {
    align-items: center !important;
}
.row {
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(-1 * var(--bs-gutter-y));
    margin-right: calc(-.5 * var(--bs-gutter-x));
    margin-left: calc(-.5 * var(--bs-gutter-x));
}
    
.table > :not(caption) > * > * {
    padding: .5rem .5rem;
    color: var(--bs-table-color-state, var(--bs-table-color-type, var(--bs-table-color)));
    background-color: var(--bs-table-bg);
    border-bottom-width: var(--bs-border-width);
    box-shadow: inset 0 0 0 9999px var(--bs-table-bg-state, var(--bs-table-bg-type, var(--bs-table-accent-bg)));
}

tbody, td, tfoot, th, thead, tr {
    border-color: inherit;
    border-style: solid;
    border-width: 0;
}



            </style>
            <body onload="window.print();window.close()">${printContents}</body>
          </head>
        </html>
      `)
      popupWin.document.close();
    }

  }
}
