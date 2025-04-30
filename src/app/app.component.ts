import { Product } from './product-list/product';
import { Component } from '@angular/core';
import { allIcons } from 'ngx-bootstrap-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Empresa ACME';

  Products: Product[] = [
    {
      productId: 1,
      productName: 'Zapatillas de running',
      productCode: 'ACME-001',
      releaseDate: '07/14/2018',
      price: 22.00,
      starRating: 4.5,
      description: 'Zapatillas de alta calidad',
      imageUrl: '',
    },

    {
      productId: 2,
      productName: 'Zapatillas de Basket',
      productCode: 'Los Angeles-003',
      releaseDate: '10/04/2025',
      price: 12.50,
      starRating: 3.5,
      description: 'Zapatillas de alta calidad',
      imageUrl: 'assets/basket.png',
    },

    {
      productId: 3,
      productName: 'Zapatillas Adidas',
      productCode: 'ACME-001',
      releaseDate: '05/09/2015',
      price: 18.00,
      starRating: 2.5,
      description: 'Zapatillas de alta calidad',
      imageUrl: 'assets/adidas.png',
    }

  ];
}
