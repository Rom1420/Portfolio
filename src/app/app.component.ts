import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { PlanetComponent } from './components/planet/planet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mainContainer', { static: false }) mainContainer!: ElementRef;
  @ViewChild(PlanetComponent) planetComponent!: PlanetComponent;

  private observer!: IntersectionObserver;

  ngAfterViewInit(): void {
    this.planetComponent.createThreeJsScene();

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.classList.contains('home-section')) {
          if (entry.isIntersecting) {
            this.planetComponent.resumeScene();
          } else {
            this.planetComponent.cleanupScene();
          }
        }
      });
    }, {
      root: this.mainContainer.nativeElement,
      threshold: 0.8
    });

    const sections = this.mainContainer.nativeElement.querySelectorAll('.snap-section');
    sections.forEach((section: Element) => {
      this.observer.observe(section);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
