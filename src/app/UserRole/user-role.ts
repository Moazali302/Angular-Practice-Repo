import { Component } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { NgSwitchCase } from '@angular/common';

@Component({
  selector: 'app-user-role',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase],
  templateUrl: './user-role.html',
  styleUrls: ['./user-role.css']
})
export class UserRole {
   selectedRole:string='';

    setRole(role:string){
      this.selectedRole=role;
    }
}
