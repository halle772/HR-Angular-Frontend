import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { LoaderService } from '../services/loader/loader.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Assume you store your token in localStorage or get it from a service
    this.loader.setLoadingCheck(true);
    const authToken = localStorage.getItem('token');
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`),
    });
    return next
      .handle(authReq)
      .pipe(finalize(() => this.loader.setLoadingCheck(false)),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          localStorage.removeItem('token');
          this.router.navigate(['/signin']);
        }
        return throwError(error);
      })
    );
  }
}
