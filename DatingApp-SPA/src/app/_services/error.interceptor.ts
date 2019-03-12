import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            return throwError(error.statusText);
          }
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            console.error(applicationError);
            return throwError(applicationError);
          }
          const serverError = error.error;
          let modelStateErrors = '';
          if (serverError && typeof serverError === 'object') {
            for (const key in serverError) {
              if (serverError[key]) {
                if (typeof serverError[key] === 'object') {
                  for (const key1 in serverError[key]) {
                    if (serverError[key][key1]) {
                      modelStateErrors += serverError[key][key1] + '\n';
                    }
                  }
                }
                modelStateErrors += serverError[key] + '\n';
              }
            }
          }
          return throwError(modelStateErrors || serverError || 'Server-Error');
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
