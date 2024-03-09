import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {AuthInterceptorService} from "./core/Interceptors/auth-interceptor-service.interceptor";
import {HotToastModule} from '@ngneat/hot-toast';
import {LoaderInterceptor} from "./core/Interceptors/loader.interceptor";
import {LoaderComponent} from "./shared/components/loader/loader.component";
import {ToastService} from "./core/services/toast.service";
import * as Sentry from "@sentry/angular-ivy";
import {Router} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HotToastModule.forRoot(),
    LoaderComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}, ToastService,
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    }, {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {
      },
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private toastService: ToastService) {
  }
}
