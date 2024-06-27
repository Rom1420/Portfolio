import { Injectable } from '@angular/core';
import { ScrollService } from './scroll.service';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private isForcingScroll: boolean = false;

  constructor(private scrollService: ScrollService) {
    this.scrollService.scrollPosition$.subscribe(position => {
      if (!this.isForcingScroll) {
        this.triggerAnimations(position);
      }
    });
  }

  private triggerAnimations(position: number): void {
    // Exemple de déclenchement d'animations basé sur la position de défilement
    if (position > 100 && position < 300) {
      document.querySelector('.profil-container')?.classList.add('animate');
    } else {
      document.querySelector('.profil-container')?.classList.remove('animate');
    }
  }

}