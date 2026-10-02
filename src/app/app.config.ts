import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // Arriba de todo al cambiar de página; scroll a la sección cuando la URL trae #fragmento.
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
      // Permite volver a hacer scroll al mismo #fragmento al clickearlo de nuevo.
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
  ],
};
