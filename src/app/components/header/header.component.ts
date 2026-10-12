import { Component, signal, inject } from '@angular/core';
import { AnalyticsService } from '../../analytics/analytics.service';
import { RouterLink } from '@angular/router';
import { NAV_LINKS, WHATSAPP_URL } from '../../config/site.config';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  protected readonly navLinks = NAV_LINKS;
  protected readonly analytics = inject(AnalyticsService);
  protected readonly whatsappUrl = WHATSAPP_URL;
  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
