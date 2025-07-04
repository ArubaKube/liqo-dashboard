/**
 * Copyright 2025 ArubaKube S.r.l.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
