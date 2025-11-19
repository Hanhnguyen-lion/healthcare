import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AccountService } from '../services/account';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  constructor(
      private router: Router,
      private accountService: AccountService
  ) {
      // redirect to home if already logged in
      if (this.accountService.accountValue) {
          this.router.navigate(['/']);
      }
  }
}
