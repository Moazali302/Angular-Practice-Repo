import { Component, Input, HostListener } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-scroll-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './scroll-page.html',
})
export class ScrollPage {
  @Input() items: string[] = [];

  visibleItems = 5; 
  increment = 5;

  @HostListener('window:scroll')
  onScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition >= threshold) {
      this.loadMore();
    }
  }

  loadMore() {
    if (this.visibleItems < this.items.length) {
      this.visibleItems += this.increment;
    }
  }
}
