import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/** Botón de WhatsApp que se clickeó; permite comparar qué CTA convierte mejor en GA4. */
export type WhatsAppCta = 'header' | 'header-mobile' | 'hero' | 'gaston';

type Gtag = (command: 'event', name: string, params?: Record<string, unknown>) => void;

/**
 * Envía eventos a Google Analytics 4 a través de `gtag`, definido en index.html.
 * Si `gtag` no existe (tests), no hace nada.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private lastPage: string | null = null;

  /**
   * Registra una page_view por cada cambio de página. Ignora los cambios de solo #fragmento
   * (los links del menú a secciones de la home), para no inflar las vistas.
   * Llamar después de SeoService.init(), así page_title ya tiene el título de la ruta nueva.
   */
  init(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        const page = event.urlAfterRedirects.split('#')[0];
        if (page === this.lastPage) return;
        this.lastPage = page;
        // page_location incluye la query, así GA4 lee los utm_source/utm_medium de los links de redes.
        this.send('page_view', {
          page_location: this.document.location.origin + page,
          page_title: this.document.title,
        });
      });
  }

  trackWhatsAppClick(cta: WhatsAppCta): void {
    this.send('click_whatsapp', { cta });
  }

  private send(name: string, params: Record<string, unknown>): void {
    const gtag = (this.document.defaultView as (Window & { gtag?: Gtag }) | null)?.gtag;
    gtag?.('event', name, params);
  }
}
