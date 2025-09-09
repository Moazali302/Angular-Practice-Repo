import { Component } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserRole } from "../UserRole/user-role";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, NgClass, RouterLink, RouterLinkActive, UserRole],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  imgUrl = "https://angular.io/assets/images/logos/angular/angular.png";
  isMenuOpen = false;
  isOnline = false;

  constructor(public router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleonline() {
    this.isOnline = !this.isOnline;
  }

  // check current route
  get showOnlineSection(): boolean {
    return this.router.url === '/home' || this.router.url === '/';
  }
   showGuest=false;

   onSelectedRole(role:string){
    if(role==='guest'){
      this.showGuest=true;
    }
   }






}
