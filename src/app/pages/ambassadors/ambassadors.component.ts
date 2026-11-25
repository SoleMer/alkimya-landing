import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../analytics/analytics.service';
import { AMBASSADOR_PROGRAM, AMBASSADOR_WHATSAPP_URL } from '../../config/site.config';

interface Step {
  title: string;
  description: string;
  example?: string;
}

interface Faq {
  question: string;
  answer: string;
}

/** Duración de la prueba gratuita, en días. */
const TRIAL_DAYS = 14;

const pesos = (amount: number): string => '$' + amount.toLocaleString('es-AR', { maximumFractionDigits: 0 });

const p = AMBASSADOR_PROGRAM;
const annualDiscount = p.discount * 10;
const monthlyCommission = ((p.monthlyPrice - p.discount) * p.monthlyCommissionPercent) / 100;
const annualCommission = ((p.annualPrice - annualDiscount) * p.annualCommissionPercent) / 100;

@Component({
  selector: 'app-ambassadors',
  imports: [RouterLink],
  templateUrl: './ambassadors.component.html',
})
export class AmbassadorsComponent {
  protected readonly analytics = inject(AnalyticsService);
  protected readonly whatsappUrl = AMBASSADOR_WHATSAPP_URL;

  protected readonly discount = pesos(p.discount);
  protected readonly monthlyPercent = p.monthlyCommissionPercent;
  protected readonly annualPercent = p.annualCommissionPercent;

  protected readonly checklist = [
    'Te damos un código.',
    'Quien lo usa paga menos.',
    'Vos te llevás una parte de su primera suscripción.',
  ];

  /** Ejemplo de la respuesta a "mi código": 3 suscripciones mensuales. */
  protected readonly statsExampleEarnings = pesos(monthlyCommission * 3);

  protected readonly kit = [
    'Tips para recomendar GastON',
    'Imprimibles personalizados con tu código',
    'Plantillas para tus historias de Instagram',
  ];

  protected readonly examples = [
    {
      plan: 'Plan mensual',
      paid: `Tu amigo paga ${pesos(p.monthlyPrice - p.discount)} el primer mes`,
      earn: pesos(monthlyCommission),
      detail: `el ${p.monthlyCommissionPercent}% del primer mes`,
    },
    {
      plan: 'Plan anual',
      paid: `Tu amigo paga ${pesos(p.annualPrice - annualDiscount)} por el año`,
      earn: pesos(annualCommission),
      detail: `el ${p.annualCommissionPercent}% del plan anual`,
    },
  ];

  protected readonly steps: Step[] = [
    {
      title: 'Escribile a GastON',
      description: 'Tocá el botón de abajo y mandale el mensaje. GastON te cuenta cómo funciona y las reglas.',
      example: 'Quiero ser embajador',
    },
    {
      title: 'Elegí tu código',
      description: 'Puede ser tu nombre o un apodo, de 4 a 12 letras o números. GastON te da un link listo para compartir.',
      example: 'SOLE2026',
    },
    {
      title: 'Compartilo',
      description: `Mandalo a tus amigos, a tu familia o subilo a tus estados. Quien lo usa prueba GastON ${TRIAL_DAYS} días gratis y después paga menos.`,
    },
    {
      title: 'Cobrá todos los meses',
      description: 'Por cada persona que se suscribe con tu código, ganás plata. A principio de cada mes te transferimos lo que juntaste.',
    },
  ];

  protected readonly rules = [
    'Cobrás por quienes pagan un plan, no por quienes solo prueban gratis.',
    'Tu código es para los demás: no lo podés usar vos.',
    'Contá lo que GastON hace de verdad, sin prometer cosas que no hace.',
    'Nada de spam: recomendalo a quien le sirva.',
  ];

  protected readonly faqs: Faq[] = [
    {
      question: '¿Quién puede ser embajador?',
      answer: 'Cualquier persona que use GastON. Solo tenés que escribirle "Quiero ser embajador" y seguir los pasos.',
    },
    {
      question: '¿Cuánto paga quien usa mi código?',
      answer: `${pesos(p.discount)} menos por mes durante todo el primer año si elige el plan mensual, o ${pesos(annualDiscount)} menos si elige el plan anual. Antes de pagar, tiene ${TRIAL_DAYS} días de prueba gratis.`,
    },
    {
      question: '¿Cuánto gano?',
      answer: `El ${p.monthlyCommissionPercent}% de lo que paga el primer mes cada persona que se suscribe al plan mensual con tu código, o el ${p.annualCommissionPercent}% de lo que paga por el plan anual. Se cobra una vez por cada persona que se suscribe.`,
    },
    {
      question: '¿Cuándo y cómo cobro?',
      answer: 'Una vez por mes, a principio de mes, por transferencia al alias o CBU/CVU que le pases a GastON con el mensaje "Mi alias es: tuAlias".',
    },
    {
      question: '¿Cómo sé cuánto voy a cobrar?',
      answer:
        'Escribile "mi código" a GastON cuando quieras: te muestra cuántas personas usaron tu código, cuántas ya pagaron, cuánto vas a cobrar el próximo mes y cuánto llevás ganado en total.',
    },
    {
      question: '¿Qué es el kit de embajador?',
      answer:
        'Un kit que te mandamos por e-mail cuando te sumás, con tips para recomendar GastON, imprimibles personalizados con tu código y plantillas para tus historias de Instagram.',
    },
    {
      question: '¿Cómo comparto mi código?',
      answer: 'Escribile "mensaje embajador" a GastON y te pasa un texto listo para copiar y pegar, con un link que guarda tu código automáticamente.',
    },
  ];
}
