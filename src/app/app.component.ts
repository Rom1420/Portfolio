import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ScrollService } from './services/scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Portfolio';
  scrollPosition: number = 0;

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    this.scrollService.scrollPosition$.subscribe(position => {
      this.scrollPosition = position;
      this.triggerAnimations(position);
      console.log("Scroll Position:", position);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const newScrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrollService.updateScrollPosition(newScrollPosition);
  }

  triggerAnimations(position: number): void {
    if (position < 100) {
      document.querySelector('.profil-container')?.classList.remove('hidden');
      document.getElementById('canvaBox')?.classList.remove('hidden');
    } if(position > 20) {
      document.querySelector('.profil-container')?.classList.add('hidden');
      document.getElementById('canvaBox')?.classList.add('hidden');
      document.getElementById('conveyorBelt')?.classList.remove('hidden');
    } if(position > 1000) {
      document.getElementById('conveyorBelt')?.classList.add('hidden');
    }
  }
}