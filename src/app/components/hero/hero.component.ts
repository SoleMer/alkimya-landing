import { Component, inject } from '@angular/core';
import { AnalyticsService } from '../../analytics/analytics.service';
import { RouterLink } from '@angular/router';
import { WHATSAPP_URL } from '../../config/site.config';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  protected readonly analytics = inject(AnalyticsService);
  protected readonly whatsappUrl = WHATSAPP_URL;
}
