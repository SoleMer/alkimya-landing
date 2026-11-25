/** URL pública del sitio, sin "/" final. Se usa para canonical y Open Graph. */
export const SITE_URL = 'https://alkimyalabs.com.ar';

/**
 * Configuración central de la landing.
 * Reemplazá WHATSAPP_NUMBER por el número real de GastON (formato internacional, sin "+" ni espacios).
 */
export const WHATSAPP_NUMBER = '5492494690364';

export const WHATSAPP_MESSAGE = 'Hola GastON!';

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/** Mensaje que inicia la inscripción al programa de embajadores en el bot (lo detecta AmbassadorSignupRegex). */
export const AMBASSADOR_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Quiero ser embajador')}`;

/**
 * Condiciones del programa de embajadores. Tienen que coincidir con el bot (GastONWebhook):
 * PaymentService (PRICE_MONTHLY / PRICE_ANNUAL) y AmbassadorService (AMBASSADOR_DISCOUNT y los porcentajes).
 * Si cambian allá, actualizarlas acá.
 */
export const AMBASSADOR_PROGRAM = {
  monthlyPrice: 3500,
  annualPrice: 35000,
  /** Descuento por cuota del plan mensual durante 12 meses; en el plan anual se descuenta 10 veces este monto. */
  discount: 300,
  monthlyCommissionPercent: 45,
  annualCommissionPercent: 20,
} as const;

export const CONTACT_EMAIL = 'alkimyalabs@gmail.com';

export const SOCIAL_LINKS = {
  instagram: {
    handle: '@alkimyalabs',
    url: 'https://www.instagram.com/alkimyalabs',
  },
  linkedin: {
    handle: 'Alkimya Labs',
    url: 'https://www.linkedin.com/company/alkimyalabs',
  },
} as const;

/** Link a una sección de la landing: se navega a `/` con `#fragment`, así funciona desde cualquier página. */
export interface NavLink {
  label: string;
  fragment: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', fragment: 'inicio' },
  { label: 'GastON', fragment: 'gaston' },
  { label: 'Sobre Nosotros', fragment: 'nosotros' },
];

export interface LegalLink {
  label: string;
  path: string;
}

/** Documentos legales agrupados por a qué aplican: el sitio web (Alkimya Labs) o el servicio (GastON). */
export interface LegalLinkGroup {
  brand: string;
  links: LegalLink[];
}

export const LEGAL_LINK_GROUPS: LegalLinkGroup[] = [
  { brand: 'Alkimya Labs', links: [{ label: 'Política de Cookies', path: '/cookies' }] },
  {
    brand: 'GastON',
    links: [
      { label: 'Términos y Condiciones', path: '/gaston/terminos' },
      { label: 'Política de Privacidad', path: '/gaston/privacidad' },
      { label: 'Términos de Embajadores', path: '/gaston/embajadores/terminos' },
    ],
  },
];
