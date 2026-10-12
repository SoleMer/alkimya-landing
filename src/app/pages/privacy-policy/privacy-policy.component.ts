import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactEmailComponent } from '../../components/contact-email/contact-email.component';

interface PolicySection {
  id: string;
  title: string;
}

@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink, ContactEmailComponent],
  templateUrl: './privacy-policy.component.html',
})
export class PrivacyPolicyComponent {
  protected readonly lastUpdated = 'Septiembre de 2026';

  /** Índice de la política; los `id` deben coincidir con los de cada <section> del template. */
  protected readonly sections: PolicySection[] = [
    { id: 'informacion-recopilada', title: 'Información que Recopilamos' },
    { id: 'uso-de-la-informacion', title: 'Uso de la Información' },
    { id: 'confidencialidad', title: 'Confidencialidad y Compartición de Datos' },
    { id: 'cuentas-compartidas', title: 'Cuentas Compartidas' },
    { id: 'seguridad', title: 'Seguridad de los Datos' },
    { id: 'retencion-y-eliminacion', title: 'Retención y Eliminación de Datos (Tus Derechos ARCO)' },
    { id: 'cambios', title: 'Cambios en esta Política' },
    { id: 'contacto', title: 'Contacto' },
  ];
}
