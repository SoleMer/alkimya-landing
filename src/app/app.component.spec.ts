import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { COOKIE_NOTICE_STORAGE_KEY } from './components/cookie-notice/cookie-notice.component';
import { routes } from './app.routes';
import { WHATSAPP_URL } from './config/site.config';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    })
      .compileComponents();
  });

  async function renderAt(url: string): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(AppComponent);
    await TestBed.inject(Router).navigateByUrl(url);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the landing at the root path', async () => {
    const page = await renderAt('/');
    expect(page.querySelector('h1')?.textContent).toContain('Software con alma.');
  });

  it('should render the privacy policy at /gaston/privacidad', async () => {
    const page = await renderAt('/gaston/privacidad');
    expect(page.querySelector('h1')?.textContent).toContain('Política de Privacidad');
    expect(page.querySelectorAll('article section h2').length).toBe(8);
    expect(page.querySelector('a[href="/"]')?.textContent).toContain('Volver al inicio');
  });

  it('should update title, description and canonical per route', async () => {
    await renderAt('/gaston/privacidad');
    expect(document.title).toContain('Política de Privacidad');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain('GastON');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://alkimyalabs.com.ar/gaston/privacidad');
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe('https://alkimyalabs.com.ar/gaston/privacidad');

    await renderAt('/');
    expect(document.title).toBe('Alkimya Labs | Software con Alma y Alquimia Tecnológica');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://alkimyalabs.com.ar/');
  });

  it('should send one GA4 page_view per page, ignoring #fragment navigations', async () => {
    const gtag = vi.fn();
    (window as unknown as { gtag: unknown }).gtag = gtag;
    try {
      await renderAt('/');
      await TestBed.inject(Router).navigate(['/'], { fragment: 'gaston' });
      await TestBed.inject(Router).navigateByUrl('/gaston/privacidad');

      const pageViews = gtag.mock.calls.filter(([, name]) => name === 'page_view');
      expect(pageViews.map(([, , params]) => new URL(params.page_location).pathname)).toEqual(['/', '/gaston/privacidad']);
      expect(pageViews[1][2].page_title).toContain('Política de Privacidad');
    } finally {
      delete (window as unknown as { gtag?: unknown }).gtag;
    }
  });

  it('should render the GastON page at /gaston, linked from the home GastON section', async () => {
    const home = await renderAt('/');
    expect(home.querySelector('#gaston a[href="/gaston"]')).toBeTruthy();

    const page = await renderAt('/gaston');
    expect(page.querySelector('h1')?.textContent).toContain('control de gastos');
    expect(page.querySelectorAll('#funciones h3').length).toBe(8);
    expect(page.querySelector('#inteligencia-artificial')?.textContent).toContain('te pasaste del 10% recomendado');
    expect(page.querySelectorAll('#preguntas-frecuentes details').length).toBeGreaterThan(0);
    expect(page.querySelector('a[href*="wa.me"]')).toBeNull();
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://alkimyalabs.com.ar/gaston');
  });

  it('should render the cookies policy at /cookies, linked from the footer and the GastON privacy policy', async () => {
    const page = await renderAt('/cookies');
    expect(page.querySelector('h1')?.textContent).toContain('Política de Cookies');
    expect(page.querySelector('footer a[href="/cookies"]')?.textContent).toContain('Política de Cookies');

    const privacy = await renderAt('/gaston/privacidad');
    expect(privacy.querySelector('main a[href="/cookies"]')).toBeTruthy();
  });

  it('should offer contact by email (Gmail and mailto) in both policies, without WhatsApp links', async () => {
    for (const url of ['/gaston/privacidad', '/cookies']) {
      const page = await renderAt(url);
      const contact = page.querySelector('#contacto')!;
      expect(contact.querySelector('a[href^="https://mail.google.com/mail/"][href*="to=alkimyalabs@gmail.com"]')).toBeTruthy();
      expect(contact.querySelector('a[href^="mailto:alkimyalabs@gmail.com"]')).toBeTruthy();
      expect(contact.querySelector('a[href*="wa.me"]')).toBeNull();
    }
  });

  it('should show the cookie notice until it is dismissed', async () => {
    localStorage.removeItem(COOKIE_NOTICE_STORAGE_KEY);
    try {
      const page = await renderAt('/');
      const notice = () => page.querySelector('aside[aria-label="Aviso de cookies"]');
      expect(notice()?.querySelector('a[href="/cookies"]')).toBeTruthy();

      notice()!.querySelector('button')!.click();
      await TestBed.inject(ApplicationRef).whenStable();
      expect(notice()).toBeNull();

      const nextVisit = await renderAt('/');
      expect(nextVisit.querySelector('aside[aria-label="Aviso de cookies"]')).toBeNull();
    } finally {
      localStorage.removeItem(COOKIE_NOTICE_STORAGE_KEY);
    }
  });

  it('should redirect the old /privacidad URL to /gaston/privacidad', async () => {
    const page = await renderAt('/privacidad');
    expect(TestBed.inject(Router).url).toBe('/gaston/privacidad');
    expect(page.querySelector('h1')?.textContent).toContain('Política de Privacidad');
  });

  it('should redirect unknown paths to the landing', async () => {
    const page = await renderAt('/no-existe');
    expect(page.querySelector('h1')?.textContent).toContain('Software con alma.');
  });

  it('should link the privacy policy from the footer', async () => {
    const page = await renderAt('/');
    const link = page.querySelector<HTMLAnchorElement>('footer a[href="/gaston/privacidad"]');
    expect(link?.textContent).toContain('Política de Privacidad');
  });

  it('should open every external link in a new tab safely', async () => {
    for (const url of ['/', '/gaston', '/gaston/privacidad', '/cookies']) {
      const page = await renderAt(url);
      const external = Array.from(page.querySelectorAll<HTMLAnchorElement>('a[href^="http"]'));
      expect(external.length).toBeGreaterThan(0);
      for (const link of external) {
        expect(link.target).toBe('_blank');
        expect(link.rel).toBe('noopener noreferrer');
      }
    }
  });

  // LANZAMIENTO: volver a `it` cuando se descomenten los CTAs de WhatsApp.
  it.skip('should point the WhatsApp CTAs to the configured number', async () => {
    const page = await renderAt('/');
    expect(page.querySelectorAll(`a[href="${WHATSAPP_URL}"]`).length).toBeGreaterThanOrEqual(3);
  });
});
