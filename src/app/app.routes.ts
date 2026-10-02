import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Alkimya Labs · Software con alma',
  },
  {
    path: 'privacidad',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.component').then((m) => m.PrivacyPolicyComponent),
    title: 'Política de Privacidad · GastON',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
