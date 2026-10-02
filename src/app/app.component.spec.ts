import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AppComponent } from './app.component';
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

  it('should render the privacy policy at /privacidad', async () => {
    const page = await renderAt('/privacidad');
    expect(page.querySelector('h1')?.textContent).toContain('Política de Privacidad');
    expect(page.querySelectorAll('article section h2').length).toBe(8);
    expect(page.querySelector('a[href="/"]')?.textContent).toContain('Volver al inicio');
  });

  it('should redirect unknown paths to the landing', async () => {
    const page = await renderAt('/no-existe');
    expect(page.querySelector('h1')?.textContent).toContain('Software con alma.');
  });

  it('should link the privacy policy from the footer', async () => {
    const page = await renderAt('/');
    const link = page.querySelector<HTMLAnchorElement>('footer a[href="/privacidad"]');
    expect(link?.textContent).toContain('Política de Privacidad');
  });

  it('should open every external link in a new tab safely', async () => {
    for (const url of ['/', '/privacidad']) {
      const page = await renderAt(url);
      const external = Array.from(page.querySelectorAll<HTMLAnchorElement>('a[href^="http"]'));
      expect(external.length).toBeGreaterThan(0);
      for (const link of external) {
        expect(link.target).toBe('_blank');
        expect(link.rel).toBe('noopener noreferrer');
      }
    }
  });

  it('should point the WhatsApp CTAs to the configured number', async () => {
    const page = await renderAt('/');
    expect(page.querySelectorAll(`a[href="${WHATSAPP_URL}"]`).length).toBeGreaterThanOrEqual(3);
  });
});
