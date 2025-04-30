import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  @Input() starRating: number = 0;
  stars: string[] = []; // 'full', 'half' o 'empty'

  ngOnChanges(): void {
    this.stars = [];
    let rating = this.starRating;

    for (let i = 1; i <= 5; i++) {
      if (rating >= 1) {
        this.stars.push('full');
      } else if (rating >= 0.5) {
        this.stars.push('half');
      } else {
        this.stars.push('empty');
      }
      rating -= 1;
    }
  }

  getStarImage(type: string): string {
    switch (type) {
      case 'full': return 'assets/star-fill.svg';
      case 'half': return 'assets/star-half.svg';
      default: return 'assets/star_empty.svg';
    }
  }
  
  
}


