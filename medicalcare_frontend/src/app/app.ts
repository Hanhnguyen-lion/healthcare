import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AccountService } from './services/account';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(
      private router: Router,
      private accountService: AccountService

  ){}
  
  isAuthenticate(){
    if (this.accountService.accountValue){
      return true;
    }
    return false;
  }

  logout(){
    this.accountService.logout();
  }

}
