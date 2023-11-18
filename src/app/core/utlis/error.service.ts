import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  public getClientErrorMessage(error: Error): string {
    if (error.message) {
      let errMessage = error.message;
      let hasSemiColon = errMessage.includes(':');
      while (hasSemiColon) {
        try {
          let newMessage = JSON.parse(errMessage);
          errMessage = newMessage.messageAr || newMessage.error.messageAr || undefined;
          hasSemiColon = false;
        } catch (err) {
          let message_array = errMessage.split(':');
          message_array.shift();
          errMessage = message_array.join(':');
          hasSemiColon = errMessage.includes(':');
        }
      }

      return errMessage || 'برجاء المحاولة مرة أخري';
    }
    return error.toString();
  }

  public getServerErrorMessage(error: HttpErrorResponse): string {
    if (navigator.onLine) {
      return error.error.messageEn ? error.error.messageEn : 'Something went wrong, please try again.';
    } else {
      return 'No Internet Connection';
    }
  }
}
