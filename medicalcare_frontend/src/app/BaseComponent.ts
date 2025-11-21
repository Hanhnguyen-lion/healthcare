import { FormControl, FormGroup } from "@angular/forms";
import { HospitalsService } from "./services/hospitals";
import { AlertService } from "./helpers/alert-service";
import { BaseServices } from "./services/base-service";
import { Router } from "@angular/router";
import { DialogService } from "./services/dialog";

export class BaseComponent{
    constructor(

        public srv: BaseServices,
        public url: string,
        public navigateByUrl: string,
        public messageSuccessful: string,
        public alertService: AlertService,
        public router: Router,
        protected dialogService: DialogService

    ){}

    protected form: any;

    protected loading = false;

    protected submitted = false;

    protected today = new Date();

    protected get f() { return this.form?.controls; }

    protected addItem(){

        this.submitted = true;
        this.alertService.clear();

        if (this.form.invalid){
            return;
        }

        this.loading = true;

        var item = this.form.value;

        this.srv.Add(item, this.url)
            .subscribe(
                (data) =>{
                    this.alertService.success(this.messageSuccessful, { keepAfterRouteChange: true });
                    this.router.navigateByUrl(this.navigateByUrl);
                }, 
                error =>{
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
    }

    protected updateItem(id: number){

        this.submitted = true;
        this.alertService.clear();

        if (this.form.invalid){
            return;
        }

        this.loading = true;

        var item = this.form.value;
        item.id = id;

        this.srv.Update(item, this.url)
            .subscribe(
                (data) =>{
                    this.alertService.success(this.messageSuccessful, { keepAfterRouteChange: true });
                    this.router.navigateByUrl(this.navigateByUrl);
                }, 
                error =>{
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
    }
 
    protected deleteItem(id: number, title: string, callback: ()=> void){

        this.dialogService.openConfirmDialog("Are you sure to want delete this item?", title)
        .subscribe((result)=>{
        if (result){
            this.srv.Delete(id, this.url)
            .subscribe(
            ()=>{
                callback();    
            },
            (error)=>{
                this.alertService.error(error);
            })
        }
        })
    }


    protected getItem(id: number, processor: (input: any) => void){
        this.srv.GetItemById(id, this.url)
        .subscribe(
            (data) =>{
                processor(data);
                this.alertService.success(this.messageSuccessful, { keepAfterRouteChange: true });
                this.router.navigateByUrl(this.navigateByUrl);
            }, 
            error =>{
                this.alertService.error(error);
                this.loading = false;
            })
    }    
}