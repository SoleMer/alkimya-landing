/**
 * Configuración central de la landing.
 * Reemplazá WHATSAPP_NUMBER por el número real de GastON (formato internacional, sin "+" ni espacios).
 */
export const WHATSAPP_NUMBER = '5492494690364';

export const WHATSAPP_MESSAGE = 'Hola GastON!';

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

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

export const LEGAL_LINKS: LegalLink[] = [
  { label: 'Política de Privacidad', path: '/privacidad' },
];
