import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScrollService } from './services/scroll.service';
import { PlanetComponent } from './components/planet/planet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('mainContainer', { static: false }) mainContainer!: ElementRef;
  @ViewChild(PlanetComponent) planetComponent!: PlanetComponent;

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.planetComponent.createThreeJsScene();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.classList.contains('home-section')) {
          this.planetComponent.setVisibility(entry.isIntersecting);
        }
      });
    }, {
      root: this.mainContainer.nativeElement,
      threshold: 0.8
    });

    const sections = this.mainContainer.nativeElement.querySelectorAll('.snap-section');
    sections.forEach((section: Element) => observer.observe(section));
  }
}
