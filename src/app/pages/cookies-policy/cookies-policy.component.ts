import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactEmailComponent } from '../../components/contact-email/contact-email.component';

interface CookieRow {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
}

@Component({
  selector: 'app-cookies-policy',
  imports: [RouterLink, ContactEmailComponent],
  templateUrl: './cookies-policy.component.html',
})
export class CookiesPolicyComponent {
  protected readonly lastUpdated = 'Octubre de 2026';

  protected readonly cookies: CookieRow[] = [
    {
      name: '_ga',
      provider: 'Google Analytics',
      purpose: 'Distingue visitantes de forma anónima para contar cuántas personas visitan el sitio.',
      duration: '2 años',
    },
    {
      name: '_ga_<ID>',
      provider: 'Google Analytics',
      purpose: 'Mantiene el estado de la visita (sesión) para medir cómo se navega el sitio.',
      duration: '2 años',
    },
  ];
}
