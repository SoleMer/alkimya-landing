import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RouteSeo } from './seo/seo.service';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Alkimya Labs | Software con Alma y Alquimia Tecnológica',
    data: {
      seo: {
        path: '/',
        description:
          'Laboratorio de software que crea herramientas inteligentes para liberar tu carga mental. Conocé GastON, tu control de gastos por WhatsApp, sin planillas ni apps.',
      } satisfies RouteSeo,
    },
  },
  {
    path: 'gaston',
    loadComponent: () => import('./pages/gaston/gaston.component').then((m) => m.GastonComponent),
    title: 'Control de Gastos por WhatsApp, sin Planillas | GastON',
    data: {
      seo: {
        path: '/gaston',
        description:
          'GastON usa IA para registrar tus gastos, cuotas y dólares con un mensaje de WhatsApp, y te avisa si te pasás del presupuesto. Sin apps ni planillas. 14 días gratis.',
      } satisfies RouteSeo,
    },
  },
  {
    path: 'gaston/embajadores',
    loadComponent: () => import('./pages/ambassadors/ambassadors.component').then((m) => m.AmbassadorsComponent),
    title: 'Ser Embajador de GastON: Ganá Plata Recomendando | GastON',
    data: {
      seo: {
        path: '/gaston/embajadores',
        description:
          'Sumate al programa de embajadores de GastON: compartí tu código, tus amigos pagan menos y vos ganás una parte de cada suscripción. Te pagamos todos los meses.',
      } satisfies RouteSeo,
    },
  },
  {
    path: 'gaston/embajadores/terminos',
    loadComponent: () =>
      import('./pages/ambassador-terms/ambassador-terms.component').then((m) => m.AmbassadorTermsComponent),
    title: 'Términos del Programa de Embajadores · GastON | Alkimya Labs',
    data: {
      seo: {
        path: '/gaston/embajadores/terminos',
        description:
          'Términos y condiciones del programa de embajadores de GastON: código de descuento, comisiones, validación y pago, y normas de promoción.',
      } satisfies RouteSeo,
    },
  },
  {
    path: 'gaston/privacidad',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.component').then((m) => m.PrivacyPolicyComponent),
    title: 'Política de Privacidad · GastON | Alkimya Labs',
    data: {
      seo: {
        path: '/gaston/privacidad',
        description:
          'Cómo GastON, el asistente de gastos por WhatsApp de Alkimya Labs, recopila, usa y protege tus datos personales y financieros según la Ley 25.326.',
      } satisfies RouteSeo,
    },
  },
  {
    path: 'gaston/terminos',
    loadComponent: () => import('./pages/terms/terms.component').then((m) => m.TermsComponent),
    title: 'Términos y Condiciones · GastON | Alkimya Labs',
    data: {
      seo: {
        path: '/gaston/terminos',
        description:
          'Términos y condiciones de uso de GastON, el asistente de gastos por WhatsApp de Alkimya Labs: uso permitido, planes de suscripción y responsabilidades.',
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
  // URL anterior de la política (ya enlazada desde el bot y compartida). En producción la redirige vercel.json con un 301.
  {
    path: 'privacidad',
    redirectTo: 'gaston/privacidad',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
