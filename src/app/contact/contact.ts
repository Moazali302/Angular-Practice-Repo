import { Component } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-contact',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  
  name:string="";
  phone:string='';
  email:string='';
  message:string='';

  onSubmit(){
    const userData={
      name:this.name,
      phone:this.phone,
      email:this.email,
      message:this.message,
      time:new Date()
    };
    
    let storedData=localStorage.getItem('contactForm');
    let contactArray=storedData? JSON.parse(storedData):[];
    contactArray.push(userData);

    localStorage.setItem('contactForm',JSON.stringify(contactArray));
    this.name='';
    this.phone='';
    this.phone='';
    this.message='';

    alert("Your message has been saved in locally");
  }
   
  marks:string="";

 
}
