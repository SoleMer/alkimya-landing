import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../analytics/analytics.service';
import { SOCIAL_LINKS, WHATSAPP_URL } from '../../config/site.config';

interface Step {
  title: string;
  description: string;
  example?: string;
}

interface Capability {
  icon: string;
  title: string;
  description: string;
  examples: string[];
}

interface ComparisonRow {
  task: string;
  spreadsheet: string;
  gaston: string;
}

interface Faq {
  question: string;
  answer: string;
}

interface ChatMessage {
  from: 'user' | 'gaston';
  text: string;
}

/** Duración de la prueba gratuita, en días. */
const TRIAL_DAYS = 14;

@Component({
  selector: 'app-gaston',
  imports: [RouterLink],
  templateUrl: './gaston.component.html',
})
export class GastonComponent {
  protected readonly analytics = inject(AnalyticsService);
  protected readonly whatsappUrl = WHATSAPP_URL;
  protected readonly instagram = SOCIAL_LINKS.instagram;
  protected readonly trialDays = TRIAL_DAYS;

  protected readonly highlights = ['Todo por WhatsApp', 'Sin instalar apps', `${TRIAL_DAYS} días gratis`, 'Sin tarjeta para empezar'];

  protected readonly chatPreview: ChatMessage[] = [
    { from: 'user', text: 'Compré una tele de 600 lucas en 6 cuotas con la Visa' },
    { from: 'gaston', text: '📺 ¡Anotado! Tele: $600.000 en 6 cuotas con Visa.' },
    { from: 'user', text: 'Compré 500 dólares a 1250' },
    { from: 'gaston', text: '💵 Registré la compra de USD 500 a $1.250.' },
    { from: 'user', text: 'resumen' },
    { from: 'gaston', text: '📊 Acá tenés el resumen de tu mes en PDF.' },
  ];

  protected readonly aiPoints: Omit<Capability, 'examples'>[] = [
    {
      icon: '🧠',
      title: 'Entiende cómo hablás',
      description:
        'Escribile como te salga: "600 lucas", "12k" o "con la Visa". La IA de GastON interpreta montos, fechas y medios de pago.',
    },
    {
      icon: '🏷️',
      title: 'Categoriza por vos',
      description: 'Cada gasto queda en su categoría (supermercado, farmacia, indumentaria…) sin que tengas que elegirla.',
    },
    {
      icon: '🔔',
      title: 'Te avisa cuando te pasás',
      description:
        'Compara lo que gastás en cada categoría con tus ingresos del mes. Si superás el porcentaje recomendado, te lo dice para que puedas frenar a tiempo.',
    },
  ];

  protected readonly aiChat: ChatMessage[] = [
    { from: 'user', text: 'Gasté 85 lucas en ropa' },
    { from: 'gaston', text: '👕 Registré $85.000 en Indumentaria.' },
    { from: 'gaston', text: '⚠️ Ojo, te pasaste del 10% recomendado para gastos en indumentaria.' },
  ];

  protected readonly steps: Step[] = [
    {
      title: 'Escribile a GastON',
      description: 'Abrí el chat y mandale un "Hola". No hay que descargar nada ni crear usuarios ni contraseñas.',
    },
    {
      title: 'Contale tus gastos',
      description: 'Escribile como le escribirías a un amigo. GastON entiende el monto, la categoría y el medio de pago.',
      example: 'Gasté 4500 en la farmacia con Visa',
    },
    {
      title: 'Pedile tu resumen',
      description: 'Cuando quieras ver cómo venís, pedí el resumen del mes y te llega en PDF al chat.',
      example: 'resumen',
    },
  ];

  protected readonly capabilities: Capability[] = [
    {
      icon: '💸',
      title: 'Gastos e ingresos',
      description: 'Registrá cada movimiento en segundos, con su categoría y medio de pago.',
      examples: ['Gasté 4500 en la farmacia con Visa'],
    },
    {
      icon: '💳',
      title: 'Compras en cuotas',
      description: 'Contale cuántas cuotas y con qué tarjeta, y GastON se encarga de registrarlas.',
      examples: ['Compré una tele de 600 lucas en 6 cuotas con la Visa'],
    },
    {
      icon: '✏️',
      title: 'Corregir o borrar',
      description: '¿Te equivocaste? Corregilo o borralo con un mensaje, sin buscar filas en una planilla.',
      examples: ['En realidad fueron 12k', 'Borrá el último gasto', 'Borrá el gasto del súper del 5 de octubre'],
    },
    {
      icon: '📊',
      title: 'Resumen del mes en PDF',
      description: 'Un reporte claro de tus gastos por categoría, listo para revisar o guardar.',
      examples: ['resumen'],
    },
    {
      icon: '🏦',
      title: 'Ahorros e inversiones',
      description: 'Llevá registro de tus plazos fijos y otras inversiones junto con tus gastos.',
      examples: ['Puse 500 lucas en un plazo fijo al 32% a 30 días'],
    },
    {
      icon: '💵',
      title: 'Dólares',
      description: 'Registrá compras de dólares y también ingresos en moneda extranjera.',
      examples: ['Compré 500 dólares a 1250', 'Cobré 2000 dólares de honorarios'],
    },
    {
      icon: '🤝',
      title: 'Cuentas compartidas',
      description: 'Compartí una cuenta con tu pareja o tu familia y lleven los gastos en conjunto.',
      examples: ['Quiero compartir una cuenta con 11 2345 6789'],
    },
    {
      icon: '💬',
      title: 'Ayuda cuando la necesites',
      description: 'Preguntale cómo hacer algo o escribí "ayuda" para ver todo lo que puede hacer.',
      examples: ['¿Cómo cargo algo en cuotas?', 'ayuda'],
    },
  ];

  protected readonly comparison: ComparisonRow[] = [
    {
      task: 'Cargar un gasto',
      spreadsheet: 'Abrir el archivo, buscar la fila y completar cada columna',
      gaston: 'Mandar un mensaje',
    },
    {
      task: 'Dónde está',
      spreadsheet: 'En la compu o en una app más',
      gaston: 'En WhatsApp, que ya usás todos los días',
    },
    {
      task: 'Compras en cuotas',
      spreadsheet: 'Calcular y anotar cada cuota a mano',
      gaston: 'Le decís cuántas cuotas y listo',
    },
    {
      task: 'Dólares y ahorros',
      spreadsheet: 'Otra pestaña, otra planilla',
      gaston: 'En el mismo chat',
    },
    {
      task: 'Resumen del mes',
      spreadsheet: 'Armar tablas, fórmulas y gráficos',
      gaston: 'Escribís "resumen" y te llega el PDF',
    },
    {
      task: 'Saber si te estás pasando',
      spreadsheet: 'Hacer las cuentas vos (si te acordás)',
      gaston: 'GastON te avisa solo',
    },
    {
      task: 'Compartir con tu pareja',
      spreadsheet: 'Compartir el archivo y pisarse los cambios',
      gaston: 'Una cuenta compartida desde el chat',
    },
  ];

  protected readonly securityPoints = [
    { icon: '🔐', text: 'Nunca te pedimos claves bancarias, números de tarjeta ni accesos a tu homebanking.' },
    { icon: '🚫', text: 'No vendemos ni compartimos tus datos con fines publicitarios.' },
    { icon: '🛡️', text: 'Tus datos viajan y se guardan encriptados.' },
    { icon: '🗑️', text: 'Podés borrar movimientos o toda tu cuenta cuando quieras.' },
  ];

  protected readonly faqs: Faq[] = [
    {
      question: '¿Tengo que descargar alguna app?',
      answer: 'No. GastON funciona dentro de WhatsApp: le escribís como a cualquier contacto y listo.',
    },
    {
      question: '¿Cuánto cuesta?',
      answer: `Tenés ${TRIAL_DAYS} días de prueba gratis con todas las funciones. Después elegís si querés seguir con un plan pago. Para ver los planes, preguntale a GastON "¿Cuánto sale?".`,
    },
    {
      question: '¿Me van a pedir la tarjeta para la prueba gratis?',
      answer: `No. Nadie te va a pedir un medio de pago durante los ${TRIAL_DAYS} días de prueba. Recién al terminar decidís si querés pagar o no.`,
    },
    {
      question: '¿GastON me da consejos sobre mis finanzas?',
      answer:
        'Sí. Su inteligencia artificial compara lo que gastás en cada categoría con tus ingresos del mes y, si te pasás del porcentaje recomendado (por ejemplo, en indumentaria), te avisa con un mensaje. Por eso conviene registrar también tus ingresos.',
    },
    {
      question: '¿Qué pasa si me equivoco al cargar un gasto?',
      answer: 'Lo corregís con un mensaje, por ejemplo "En realidad fueron 12k", o lo borrás con "Borrá el último gasto".',
    },
    {
      question: '¿Puedo usarlo con mi pareja o mi familia?',
      answer: 'Sí. Podés compartir una cuenta con otra persona para que los dos registren y vean los movimientos.',
    },
    {
      question: '¿Registra gastos en dólares e inversiones?',
      answer: 'Sí. Podés registrar compras de dólares, ingresos en moneda extranjera, plazos fijos y otras inversiones.',
    },
    {
      question: '¿Es seguro?',
      answer: 'GastON nunca te pide claves bancarias ni datos de tarjetas, y tus datos se guardan encriptados. No los vendemos ni los usamos para publicidad.',
    },
    {
      question: '¿Cómo veo todo lo que puede hacer?',
      answer: 'Escribile "ayuda" en el chat, o preguntale directamente cómo hacer algo.',
    },
  ];
}
