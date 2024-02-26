import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HotToastService} from '@ngneat/hot-toast';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ErrorService} from "../utlis/error.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {
  }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const notifier = this.injector.get(HotToastService);
    const router = this.injector.get(Router);

    let message;
    let errorType: string;

    if (error instanceof HttpErrorResponse) {
      if ([401, 0].includes(error.status)) {
        /**
         * Handle 401 Unauthorized - Log out user and redirect to login page
         */
        localStorage.clear()
        router.navigate(['/login']); // Adjust the route as needed
      } else {
        /**
         * Other server errors
         */
        message = errorService.getServerErrorMessage(error);
        errorType = 'Server Side Error';
        notifier.error(message);
      }
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
