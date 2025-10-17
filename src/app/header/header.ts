import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserRole } from "../UserRole/user-role";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, NgClass, RouterLink, RouterLinkActive,DatePipe],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl:'./header.css'
})
export class Header {
  isMenuOpen = false;
  isOnline = false;
  today=new Date();

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
