import { Component } from '@angular/core';

interface TransmutationStep {
  from: string;
  to: string;
}

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
})
export class AboutSectionComponent {
  protected readonly transmutations: TransmutationStep[] = [
    { from: 'Carga mental', to: 'Claridad' },
    { from: 'Caos cotidiano', to: 'Tiempo libre' },
    { from: 'Tareas repetitivas', to: 'Tranquilidad' },
  ];
}
