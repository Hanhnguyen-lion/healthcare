import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  
  @Input() title: string = "";
  
  @Input() message: string = "";

  constructor(public activeDialog: NgbActiveModal){

  }

  onClose(){
    this.activeDialog.dismiss();
  }

  onConfirm(){
    this.activeDialog.close(true);
  }
}
