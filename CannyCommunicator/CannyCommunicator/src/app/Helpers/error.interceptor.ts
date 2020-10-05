import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { AuthenticationServiceService } from '../Services/authentication-service.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationServiceService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status == 401){
        this.authenticationService.logout();
        // location.reload(true);
      }
      else if(err.status == 400){
        this.router.navigate(['/Oops']);
      }

       const error = err.error.message || err.statusText;
       return throwError(error);
    }));
  }
}
