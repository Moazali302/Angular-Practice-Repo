import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
 imgUrl = "https://angular.io/assets/images/logos/angular/angular.png";
 isMenuOpen=false;

 toggleMenu(){
  this.isMenuOpen=!this.isMenuOpen;
 }
}
