import { AlertService } from "./helpers/alert-service";
import { BaseServices } from "./services/base-service";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogService } from "./services/dialog";
import { ChangeDetectorRef, Component, inject, Inject, isDevMode, OnInit } from "@angular/core";
import { Observable } from "rxjs";


@Component({
  selector: 'app-base-component',
  template: `<!-- Base component template -->`,
  styles: []
})
export class BaseComponent implements OnInit {
  // Properties accessible by child components
  protected data?: Observable<any[]>;
  private data_1?: Observable<any[]>;

  protected form: any;

  protected loading = false;

  protected submitted = false;

  protected today = new Date();

  protected get f() { return this.form?.controls; }

  constructor(
    @Inject('apiUrl') protected apiUrl: string,
    @Inject('titleConfirmDialog') protected titleConfirmDialog: string,
    @Inject('successfullMessage') protected successfullMessage: string,
    @Inject('navigateByUrl') protected navigateByUrl: string,
    protected router: Router,
    protected baseSrv: BaseServices, 
    protected dialogService: DialogService,
    protected alertService: AlertService,
    protected routerActive: ActivatedRoute
  ) {
  }
  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadData();
  }
   
  protected detectChanges() {

    if (isDevMode()) 
      return this.changeDetector.detectChanges();
    else 
      return (): any => undefined;
  }

  private loadData(){

    this.data_1 = this.baseSrv.GetItems(this.apiUrl);

    this.data = this.data_1;
  }

  protected addItem(){

    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid){
        return;
    }

    this.loading = true;

    var item = this.form.value;
    this.baseSrv.Add(item, this.apiUrl)
        .subscribe(
            (data) =>{
                this.alertService.success(this.successfullMessage, { keepAfterRouteChange: true });
                this.detectChanges();
                this.navigateTo(this.navigateByUrl);
            }, 
            error =>{
                this.alertService.error(error);
                this.loading = false;
            }
        );
  }

  protected updateItem(){
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid){
        return;
    }

    this.loading = true;

    var item = this.form.value;

    var id = +this.routerActive.snapshot.params["id"] | 0;
    item.id = id;

    this.baseSrv.Update(item, this.apiUrl)
        .subscribe(
            (data) =>{
                this.alertService.success(this.successfullMessage, { keepAfterRouteChange: true });
                this.detectChanges();
                this.navigateTo(this.navigateByUrl);
            }, 
            error =>{
                this.alertService.error(error);
                this.loading = false;
            }
        );
  }

  deleteItem(id: number){
    this.dialogService.openConfirmDialog("Are you sure to want delete this item?", this.titleConfirmDialog)
        .subscribe((result)=>{
            if (result){
                this.baseSrv.Delete(id, this.apiUrl)
                .subscribe(
                ()=>{
                    this.loadData();
                    this.detectChanges();
                },
                (error)=>{
                    console.log(error);
                })
            }
        });
  }

  // Common methods for child components
  private navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }

  compareFn(option1: any, option2: any): boolean {
    return option1 && option2 ? option1.id === option2.id : option1 === option2;
  }
}