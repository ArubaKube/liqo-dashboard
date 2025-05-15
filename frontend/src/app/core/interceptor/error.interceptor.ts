import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import {ModalService} from "../services/modal.service";
import {Router} from "@angular/router";
import {TranslocoService} from "@jsverse/transloco";

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(
    private translateService: TranslocoService,
    private modalService: ModalService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  return next.handle(request)
      .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMsg = '';
            if (error.error instanceof ErrorEvent) {
              this.modalService.showError({title: this.translateService.translate('generic.requestErrorTitle'), text: this.translateService.translate('generic.requestErrorText')})
              errorMsg = `Error: ${error.error.message}`;
            } else {
              this.modalService.showError({title: this.translateService.translate('generic.requestErrorTitle'), text: this.translateService.translate('generic.requestErrorText')})
              errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            }
            console.log(errorMsg);
            this.router.navigate(['/dashboard/liqo'])
            return throwError(errorMsg);
          })
      )
}

}
