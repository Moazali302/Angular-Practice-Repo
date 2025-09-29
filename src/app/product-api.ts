import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, timeout, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApi {
  
  private productAPi= 'https://fakestoreapi.com/products';

  constructor(private http:HttpClient){}

  getProducts(){
    return this.http.get(this.productAPi).pipe(
      timeout(10000), 
      catchError(err => {
        return throwError(() => new Error("Products API failed: " + err.message));
      })
    );
  }

  private electronicAPi= 'https://fakestoreapi.com/products';
  
  getElectronics(){
    return this.http.get<any[]>(this.electronicAPi).pipe(
      timeout(10000),
      map((product:any[]) => product.filter(p => p.category === 'electronics')),
      catchError(err => {
        return throwError(() => new Error("Electronics API failed: " + err.message));
      })
    );
  }
}
