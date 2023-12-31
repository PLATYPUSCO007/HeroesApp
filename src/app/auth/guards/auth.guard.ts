import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      //VALIDATETOKEN()
      return this.authService.isLogginUser()
        .pipe(
          tap(validate =>{
            console.log('Validacion de session ', validate);
            
            if (!validate) {
              this.router.navigate(['./auth/login'])
              
            }
          })
        )
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      //VALIDATETOKEN()
      return this.authService.isLogginUser()
        .pipe(
          tap(validate =>{
            console.log('Validacion de session ', validate);
            if (!validate) {
              this.router.navigate(['./auth/login'])
            }
          })
        )
      
  }
}
