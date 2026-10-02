import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEGAL_LINKS, NAV_LINKS, SOCIAL_LINKS } from '../../config/site.config';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  protected readonly navLinks = NAV_LINKS;
  protected readonly legalLinks = LEGAL_LINKS;
  protected readonly social = SOCIAL_LINKS;
  protected readonly year = new Date().getFullYear();
}
