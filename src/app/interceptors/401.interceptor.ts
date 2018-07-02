import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).catch((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
            window.location.href = "/login";
        }
      }
      return Observable.throw(err);
    });
  }
}
