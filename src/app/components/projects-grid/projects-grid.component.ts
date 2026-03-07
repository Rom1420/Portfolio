import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { PROJECTS } from '../../mocks/mock-projects';
import { Project } from '../../models/projects-model';

@Component({
  selector: 'projects-grid',
  templateUrl: './projects-grid.component.html',
  styleUrls: ['./projects-grid.component.scss']
})
export class ProjectsGridComponent {
  @ViewChildren('cardVideo') videoEls!: QueryList<ElementRef<HTMLVideoElement>>;

  projects: (Project & { key: string })[] = Object.entries(PROJECTS).map(([key, p]) => ({ key, ...p }));

  onMouseEnter(index: number): void {
    const videos = this.videoEls.toArray();
    if (videos[index]) {
      const vid = videos[index].nativeElement;
      vid.currentTime = 0;
      vid.play();
    }
  }

  onMouseLeave(index: number): void {
    const videos = this.videoEls.toArray();
    if (videos[index]) {
      const vid = videos[index].nativeElement;
      vid.pause();
      vid.currentTime = 0;
    }
  }
}
