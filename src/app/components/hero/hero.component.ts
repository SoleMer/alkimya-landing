import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHATSAPP_URL } from '../../config/site.config';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  protected readonly whatsappUrl = WHATSAPP_URL;
}
