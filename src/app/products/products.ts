import { Component } from '@angular/core';
import { ProductApi } from '../product-api';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products {
  Products: any[] = [];
  isLoading = false;     
  errorMessage = '';     

  constructor(private productApi: ProductApi) {}

  loadProducts() {
      if (this.Products.length > 0) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.Products = [];

    this.productApi.getProducts().subscribe({
      next: (data: any) => {
        console.log("API Response:", data);
        this.Products = data;
        this.isLoading = false;
        console.log(" Products Loaded:", this.Products);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = ' Failed to load products. Please try again later.';
        console.error("API Error:", err);
      }
    });
  }
}
