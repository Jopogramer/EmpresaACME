import { Component, OnInit, Input } from '@angular/core';
import { Product } from './product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  @Input('datos') public Products: Product[] = [];

  imageWidth: number = 100;
  imageMargin: number = 5;
  hoveredIndex: number | null = null;
  constructor() { }

  ngOnInit(): void {

  }

}
