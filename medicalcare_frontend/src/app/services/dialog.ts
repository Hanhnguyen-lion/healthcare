import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable} from 'rxjs';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  
  constructor(private dialogService: NgbModal) { }

  openConfirmDialog(message: string, title: string): Observable<boolean>{
    const modalRef = this.dialogService.open(ConfirmDialog);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.title = title;

    return new Observable((observable) =>{
      modalRef.result.then(
        (result) =>{
          observable.next(true);
          observable.complete();
        },
        (reason) =>{
          observable.next(false);
          observable.complete();
        }
      )
    })
  }
}
