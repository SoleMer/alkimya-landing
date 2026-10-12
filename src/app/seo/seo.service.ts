import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SITE_URL } from '../config/site.config';

/** Datos SEO de una ruta: se declaran en `data.seo` de cada ruta en app.routes.ts. */
export interface RouteSeo {
  description: string;
  /** Path canónico, con "/" inicial (ej: "/privacidad"). */
  path: string;
}

/**
 * Mantiene title, description, canonical, Open Graph y Twitter Cards en sincronía con la ruta activa.
 * Los valores de la home también están estáticos en index.html para los crawlers que no ejecutan JS
 * (WhatsApp, Facebook, LinkedIn).
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  init(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.apply(this.deepestChild(this.router.routerState.snapshot.root)));
  }

  private apply(route: ActivatedRouteSnapshot): void {
    const seo = route.data['seo'] as RouteSeo | undefined;
    if (!seo) return;

    const title = route.title ?? this.title.getTitle();
    const url = `${SITE_URL}${seo.path}`;

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }

  private deepestChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return route.firstChild ? this.deepestChild(route.firstChild) : route;
  }
}
