import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface TermsSection {
  id: string;
  title: string;
}

@Component({
  selector: 'app-terms',
  imports: [RouterLink],
  templateUrl: './terms.component.html',
})
export class TermsComponent {
  protected readonly lastUpdated = 'Octubre de 2026';

  /** Índice de los términos; los `id` deben coincidir con los de cada <section> del template. */
  protected readonly sections: TermsSection[] = [
    { id: 'naturaleza-del-servicio', title: 'Naturaleza del Servicio e Interfaz' },
    { id: 'uso-permitido', title: 'Uso Permitido y Reglas de Conducta' },
    { id: 'privacidad-y-datos', title: 'Privacidad, Datos y Tratamiento de Mensajes' },
    { id: 'costos-y-tarifas', title: 'Costos y Tarifas de Datos' },
    { id: 'limitacion-de-responsabilidad', title: 'Limitación de Responsabilidad' },
    { id: 'modificaciones-y-suspension', title: 'Modificaciones y Suspensión del Servicio' },
    { id: 'ley-aplicable', title: 'Ley Aplicable' },
  ];
}
