import { Component, computed, input } from '@angular/core';
import { CONTACT_EMAIL } from '../../config/site.config';

/**
 * Contacto por mail: muestra la dirección y dos botones, uno que abre Gmail en el navegador
 * y otro que abre la app de correo del dispositivo (mailto), para quien no usa Gmail.
 */
@Component({
  selector: 'app-contact-email',
  templateUrl: './contact-email.component.html',
})
export class ContactEmailComponent {
  /** Asunto precargado del mail. */
  readonly subject = input.required<string>();

  protected readonly email = CONTACT_EMAIL;
  protected readonly gmailUrl = computed(
    () =>
      `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${encodeURIComponent(this.subject())}`,
  );
  protected readonly mailtoUrl = computed(() => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(this.subject())}`);
}
