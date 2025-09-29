import { Component } from '@angular/core';
import { ProductApi } from '../product-api';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products {
  Products: any[] = [];
  isLoadingDress = false;     
  errorMessageDress = '';     

  constructor(private productApi: ProductApi) {}

  loadProducts() {
      if (this.Products.length > 0) return;
    this.isLoadingDress = true;
    this.errorMessageDress = '';
    this.Products = [];

    this.productApi.getProducts().subscribe({
      next: (data: any) => {
        console.log("API Response:", data);
        this.Products = data;
        this.isLoadingDress = false;
        console.log(" Products Loaded:", this.Products);
      },
      error: (err) => {
        this.isLoadingDress = false;
        this.errorMessageDress = ' Failed to load products. Please try again later.';
        console.error("API Error:", err);
      }
    });
  }

  ElecProducts:any[]=[];
  isLoadingEle=false;
  errorMessageEle='';

  fetchElectronics(){
  if(this.ElecProducts.length>0) return;
  this.isLoadingEle=true;
  this.errorMessageEle='';
  this.ElecProducts=[];
  this.productApi.getElectronics().subscribe({
    next:Data=>{
      console.log("Electronics API Response:",Data);
      this.ElecProducts=Data;
      this.isLoadingEle=false;
      console.log("Electronics Products Loaded:",this.ElecProducts);
   },
      error:(err)=>{
        console.error("Electronics API Error:",err);
        this.isLoadingEle=false;
        this.errorMessageEle='Failed to load electronic products. Please try again later.';
      }
    }

);}
}
