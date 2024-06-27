import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  scrollPosition$ = new BehaviorSubject<number>(0);
  
  updateScrollPosition(position: number): void {
    this.scrollPosition$.next(position);
  }
}