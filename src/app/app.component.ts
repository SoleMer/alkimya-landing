import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

/** Alto del header fijo, para que el scroll a un #fragmento no quede tapado. */
const HEADER_OFFSET_PX = 80;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {
    inject(ViewportScroller).setOffset([0, HEADER_OFFSET_PX]);
  }
}
