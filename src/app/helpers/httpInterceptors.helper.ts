import {Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import { EventBusService } from '../shared/eventBus/services/event-bus.service';
import { AuthService } from '../auth/services/auth.service';
import { EventData } from '../shared/eventBus/services/event.class';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor{

    private isRefreshing: boolean = false;

    constructor(private eventBusService: EventBusService,
                private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            withCredentials: true
        });

        return next.handle(req).pipe(
            catchError((error)=>{
                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401
                ) {
                    return this.handle401Error(req, next);
                }

                return throwError(()=>error);
            })
        )
    }

    handle401Error(request: HttpRequest<any>, next: HttpHandler){
        if (!this.isRefreshing) {
            this.isRefreshing = true;

            if (this.authService.isLogginUser()) {
                this.eventBusService.emit(new EventData('logout', null));
            }
        }

        return next.handle(request);
    }

}

export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
];

