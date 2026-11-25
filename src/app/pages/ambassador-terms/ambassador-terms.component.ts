import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface TermsSection {
  id: string;
  title: string;
}

@Component({
  selector: 'app-ambassador-terms',
  imports: [RouterLink],
  templateUrl: './ambassador-terms.component.html',
})
export class AmbassadorTermsComponent {
  protected readonly lastUpdated = 'Noviembre de 2026';

  /** Índice de los términos; los `id` deben coincidir con los de cada <section> del template. */
  protected readonly sections: TermsSection[] = [
    { id: 'objeto-y-aceptacion', title: 'Objeto y Aceptación' },
    { id: 'elegibilidad', title: 'Elegibilidad e Inscripción' },
    { id: 'naturaleza-de-la-relacion', title: 'Naturaleza de la Relación' },
    { id: 'codigo-y-atribucion', title: 'Código de Descuento y Atribución de Referidos' },
    { id: 'comisiones', title: 'Estructura de Comisiones' },
    { id: 'validacion-y-pagos', title: 'Validación, Reembolsos y Liquidación de Pagos' },
    { id: 'promocion-y-marca', title: 'Normas de Promoción y Uso de Marca' },
    { id: 'confidencialidad', title: 'Confidencialidad y Protección de Datos' },
    { id: 'vigencia-y-terminacion', title: 'Vigencia y Terminación' },
    { id: 'modificaciones-y-jurisdiccion', title: 'Modificaciones y Jurisdicción' },
  ];
}
