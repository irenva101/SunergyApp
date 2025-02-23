import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { environment } from './environments/environment';
import { API_BASE_URL } from './api/api-reference';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './api/auth-interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: API_BASE_URL, useValue: environment.pathApi},
    provideToastr(),
    provideHttpClient(),
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        positionClass: 'toast-fixed',
        timeOut: 3000,
        closeButton: true,
        tapToDismiss: true,
      }),
      HttpClientModule,
    ),
    provideCharts(withDefaultRegisterables()),
  ],
};
