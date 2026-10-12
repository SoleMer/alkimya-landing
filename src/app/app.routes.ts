import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RouteSeo } from './seo/seo.service';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Control de Gastos por WhatsApp, sin Planillas | GastON',
    data: {
      seo: {
        path: '/',
        description:
          'Registrá tus gastos mandando un mensaje de WhatsApp. GastON los ordena por categoría y te arma reportes, sin planillas de Excel ni apps. Creado por Alkimya Labs.',
      } satisfies RouteSeo,
    },
  },
  {
    path: 'privacidad',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.component').then((m) => m.PrivacyPolicyComponent),
    title: 'Política de Privacidad · GastON | Alkimya Labs',
    data: {
      seo: {
        path: '/privacidad',
        description:
          'Cómo GastON, el asistente de gastos por WhatsApp de Alkimya Labs, recopila, usa y protege tus datos personales y financieros según la Ley 25.326.',
      } satisfies RouteSeo,
    },
  },
  {
    path: 'cookies',
    loadComponent: () =>
      import('./pages/cookies-policy/cookies-policy.component').then((m) => m.CookiesPolicyComponent),
    title: 'Política de Cookies | Alkimya Labs',
    data: {
      seo: {
        path: '/cookies',
        description:
          'Qué cookies usa el sitio web de Alkimya Labs, para qué sirven y cómo desactivarlas. Usamos Google Analytics solo con fines estadísticos.',
      } satisfies RouteSeo,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
