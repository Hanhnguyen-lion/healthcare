import { AfterContentChecked, ChangeDetectorRef, Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog  implements AfterContentChecked{
  
  @Input() title: string = "";
  
  @Input() message: string = "";

  constructor(
    public activeDialog: NgbActiveModal,
    private changeDetector: ChangeDetectorRef){

  }
  ngAfterContentChecked(): void {
    this.changeDetector .detectChanges();
  }

  onClose(){
    this.activeDialog.dismiss();
  }

  onConfirm(){
    this.activeDialog.close(true);
  }
}
