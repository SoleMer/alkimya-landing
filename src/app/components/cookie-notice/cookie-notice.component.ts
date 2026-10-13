import { Component, afterNextRender, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Clave en localStorage que recuerda que el visitante cerró el aviso. */
export const COOKIE_NOTICE_STORAGE_KEY = 'alkimya-cookie-notice-dismissed';

/**
 * Aviso informativo sobre el uso de cookies de analíticas. No bloquea la medición:
 * solo informa y enlaza a la Política de Cookies. Se muestra hasta que el visitante lo cierra.
 */
@Component({
  selector: 'app-cookie-notice',
  imports: [RouterLink],
  templateUrl: './cookie-notice.component.html',
})
export class CookieNoticeComponent {
  // Arranca oculto y se decide en el navegador: al prerenderizar no hay localStorage, y así el HTML
  // estático no trae un aviso que después desaparece para quien ya lo cerró.
  protected readonly visible = signal(false);

  constructor() {
    afterNextRender(() => this.visible.set(!this.wasDismissed()));
  }

  protected dismiss(): void {
    this.visible.set(false);
    try {
      localStorage.setItem(COOKIE_NOTICE_STORAGE_KEY, '1');
    } catch {
      // Sin almacenamiento (modo privado, bloqueado): el aviso volverá a aparecer en la próxima visita.
    }
  }

  private wasDismissed(): boolean {
    try {
      return localStorage.getItem(COOKIE_NOTICE_STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  }
}
