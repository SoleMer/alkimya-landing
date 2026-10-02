import { Component } from '@angular/core';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { GastonSectionComponent } from '../../components/gaston-section/gaston-section.component';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, GastonSectionComponent, AboutSectionComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
