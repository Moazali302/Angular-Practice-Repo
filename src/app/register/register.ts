import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Home } from '../Home/home';

@Component({
  standalone:true,
  imports:[FormsModule],
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  email='';
  password='';

  @Output() formSubmitted= new EventEmitter<{email:string, password:string}>();

  onSubmitted(){
    this.formSubmitted.emit({
      email:this.email,
      password:this.password      
    });
  }
  
}
