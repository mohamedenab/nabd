import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private skip: string[] = [];

  requestsCount = 0;

  constructor(private loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.skip.some((url) => request?.url?.includes(url))) {
      return next.handle(request);
    } else {
      this.loaderService.setLoader(true);
      this.requestsCount++;

      return next.handle(request).pipe(
        finalize(() => {
          this.requestsCount--;

          if (this.requestsCount === 0) {
            this.loaderService.setLoader(false);
          }
        })
      );
    }
  }
}
