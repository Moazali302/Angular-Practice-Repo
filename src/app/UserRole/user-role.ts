import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgSwitch } from '@angular/common';
import { NgSwitchCase } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-role',
  standalone: true,
  imports: [ CommonModule,NgSwitch, NgSwitchCase, ReactiveFormsModule],
  templateUrl: './user-role.html',
  styleUrls: ['./user-role.css']
})
export class UserRole {
  selectedRole: string = "";

  // Forms
  userForm = new FormGroup({
    name: new FormControl('',Validators.required ),
    email: new FormControl('',[Validators.required , Validators.minLength(8)])
  });

  adminForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('',[Validators.required,Validators.minLength(8)])
  });

  // Submitted data
  userData: any = null;
  adminData: any = null;

  // OnInit mai localStorage check
  ngOnInit(): void {
    const user = localStorage.getItem("userData");
    const admin = localStorage.getItem("adminData");

    if (user) this.userData = JSON.parse(user);
    if (admin) this.adminData = JSON.parse(admin);
  }

  setRole(role: string) {
    this.selectedRole = role;
  }

  submitUser() {
    this.userData = this.userForm.value;
    localStorage.setItem("userData", JSON.stringify(this.userData));
    this.userForm.reset();
  }

  submitAdmin() {
    this.adminData = this.adminForm.value;
    localStorage.setItem("adminData", JSON.stringify(this.adminData));
    this.adminForm.reset();
  }

  deleteAdmin(){
    this.adminData=null;
    localStorage.removeItem("adminData");
  }
  deleteUser(){
    this.userData=null;
    localStorage.removeItem("userData");
  }
}