import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Account } from '../models/account';
import { Router } from '@angular/router';

const baseUrl = `${enviroment.apiUrl}/Accounts`;

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  
  private accountSubject: BehaviorSubject<Account | null>;
  public account: Observable<Account | null>;

  httpHeader = {headers: new HttpHeaders({
    "Content-Type": "application/json"
  })};
  
  constructor(
    private http: HttpClient,
    private router: Router
  ){
    this.accountSubject = new BehaviorSubject<Account | null>(null);
    this.account = this.accountSubject.asObservable();
  }
  
  register(account: Account): Observable<Account>{
    const url = `${baseUrl}/Register`;
    return this.http.post<Account>(url, account, this.httpHeader);
  }
  
  login(email: string, password: string): Observable<Account>{
    const url = `${baseUrl}/Authenticate`;
    
    var account = {
      "email": email,
      "password": password
    };

    return this.http.post<Account>(url, account, this.httpHeader)
    .pipe(map(account =>{
      this.accountSubject.next(account);
      return account;
    }));
  }

  logout() {
      this.accountSubject.next(null);
      this.router.navigate(['/Account/Login']);
  }

  public get accountValue(): Account | null{
    return this.accountSubject.value;
  }
}
