import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptorService} from "./core/Interceptors/auth-interceptor-service.interceptor";
import {HotToastModule} from '@ngneat/hot-toast';
import {LoaderInterceptor} from "./core/Interceptors/loader.interceptor";
import {LoaderComponent} from "./shared/components/loader/loader.component";
import {GlobalErrorHandler} from './core/Interceptors/global-error-handler';
import {EmptyResponseInterceptor} from "./core/Interceptors/empty-response-body-interceptor.resolver";

@NgModule({
  declarations: [
    AppComponent
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
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
