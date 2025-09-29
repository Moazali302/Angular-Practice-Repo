import { Component, EventEmitter, importProvidersFrom, Input, input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Home } from '../Home/home';
import { RouterLink } from '@angular/router';

@Component({
  standalone:true,
  imports:[FormsModule,RouterLink],
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css']
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
