import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AccountService } from "../services/account";

@Injectable({providedIn: "root"})

export class AuthGuard implements CanActivate{

    constructor(
        private router: Router,
        private accountService: AccountService
    ){}

    canActivate(){
        var account = this.accountService.accountValue;
        if (account){
            return true;
        }
        else{
            this.router.navigateByUrl("/Account/Login");
            return false;
        }
    }
}
