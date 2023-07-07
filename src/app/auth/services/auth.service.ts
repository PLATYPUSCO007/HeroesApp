import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { Router } from '@angular/router';
import { AuthUser } from '../interfaces/authUser.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private USER_KEY: string = environment.USER_KEY;
  private baseAPI: string = environment.baseUrlAPI;
  private _auth: Auth | undefined | any;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  get auth(): Auth{
    return {...this._auth!};
  }

  constructor(private http: HttpClient,
              private router: Router) { }

  // validateToken(): Observable<boolean>{
    
  //   if (!localStorage.getItem('token')) {
  //     return of(false);
  //   }

  //   return this.http.get<Auth>(`${this.baseUrl}/usuarios/${localStorage.getItem('token')}`)
  //     .pipe(
  //       map(auth => {
  //         this._auth = auth;
  //         return true;
  //       })
  //     )
  // }

  isLogginUser(): Observable<boolean>{
    const auth = window.sessionStorage.getItem(this.USER_KEY);
    if (!auth) {
      return of(false);
    }
    this._auth = auth;
    return of(true);
  }

  // sigIn(){
  //   return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
  //     .pipe(
  //       tap(auth => {
  //         console.log('Pipe TAP in Service Auth', auth);
  //         this._auth = auth;
  //       }),
  //       tap(auth => {
  //         localstorage.setItem('token', auth.id)
  //       })
  //     )
  // }

  sigIn(user: string, pass: string) :Observable<AuthUser>{
    return this.http.post<AuthUser>(`${this.baseAPI}/Auth`, {user, pass}, this.httpOptions)
      .pipe(
        tap(auth => {
          console.log('Pipe TAP in Service Auth', auth);
          this._auth = auth;
        }),
        tap(auth => {
          window.sessionStorage.removeItem(this.USER_KEY);
          window.sessionStorage.setItem(this.USER_KEY, auth.user);
        })
      )
  }

  logOut(){
    return this.http.post<any>(`${this.baseAPI}/Auth/logout`, {})
      .pipe(
        tap(auth => {
          console.log('Pipe TAP in Service Auth', auth);
          this._auth = null;
        }),
        tap(auth => {
          window.sessionStorage.clear();
          this.router.navigate(['./auth']);
        })
      )
  }
}
