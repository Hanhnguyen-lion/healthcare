import { NgClass} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AccountService } from '../services/account';


@Component({
  selector: 'app-login',
  imports: [NgClass, ReactiveFormsModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{
  
  form:any;

  loading = false;

  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
  ){

  }

  ngOnInit() {
    this.form = this.formBuilder?.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  get f() { return this.form?.controls; }

  onSubmit(){
    
    this.submitted = true;
      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      var account = this.form.value;
      this.accountService.login(account.email, account.password)
        .subscribe({
          next:(data) =>{
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
          },
          error:()=>{
            this.loading = false;
          }
        });
  }
}
