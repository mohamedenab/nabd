import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {ErrorService} from "../utlis/error.service";
import {HotToastService} from "@ngneat/hot-toast";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  /**
   * Error handling is important and needs to be loaded first.
   *
   * Because of this we should manually inject the services with Injector.
   */
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const notifier = this.injector.get(HotToastService);
    let message;
    let errorType: string;
    if (error instanceof HttpErrorResponse) {
      /**
       * Server error
       */
      message = errorService.getServerErrorMessage(error);
      errorType = 'Server Side Error';
      notifier.error(message);
    } else {
      /**
       * Client Error
       */
      console.trace('-> error', error.stack);
      message = errorService.getClientErrorMessage(error);
      errorType = 'Client Side Error';
      notifier.error(message);
    }
    /**
     * Always log errors
     */
  }
}
