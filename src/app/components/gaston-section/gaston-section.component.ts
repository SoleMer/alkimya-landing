import { Component } from '@angular/core';
import { WHATSAPP_URL } from '../../config/site.config';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface ChatMessage {
  from: 'user' | 'gaston';
  text: string;
}

@Component({
  selector: 'app-gaston-section',
  templateUrl: './gaston-section.component.html',
})
export class GastonSectionComponent {
  protected readonly whatsappUrl = WHATSAPP_URL;

  protected readonly features: Feature[] = [
    {
      icon: '📱',
      title: 'Texto',
      description: 'Registrá tus gastos en segundos como si le hablaras a un amigo.',
    },
    {
      icon: '📊',
      title: 'Reportes Claros',
      description: 'Tablas de control, gastos por categorías y resúmenes sin planillas difíciles.',
    },
    {
      icon: '🔒',
      title: 'Sin Descargar Apps',
      description: 'Funciona directamente sobre WhatsApp, sin ocupar espacio ni crear cuentas complejas.',
    },
  ];

  protected readonly chatPreview: ChatMessage[] = [
    { from: 'user', text: 'Gasté 3500 en el súper 🛒' },
    { from: 'gaston', text: '¡Listo! Registré $3.500 en Supermercado.' },
    { from: 'user', text: 'Dame el resumen de mis gastos de este mes' },
    { from: 'gaston', text: '📊 Aquí tenés el resumen detallado de tus finanzas.' },
  ];
}
