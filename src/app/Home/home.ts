import { Component, OnInit } from '@angular/core';
import { NgForOf, NgFor, NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Contact } from "../contact/contact";
import { Register } from '../register/register';
import { RoleService } from '../role-service';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgForOf, FormsModule, NgFor, NgIf, ReactiveFormsModule, Contact,Register],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
    tasks = ['Learn Angular', 'Install Tailwind', 'Build Taskboard'];
   name:string ="";
   imgUrl="https://cdn.pixabay.com/photo/2017/02/26/00/05/cranium-2099129_1280.png";
   count=0;

   increment(){
    this.count++;
   }
   city="";
   isHighlighted=true;
   
    toggleHighlight(){
      this.isHighlighted=!this.isHighlighted;
    }
    newlist:string='';
     lists: string[] = [];
     
      ngOnInit():void{
        const saveTasks=localStorage.getItem('tasks');
        if(saveTasks){
          this.lists=JSON.parse(saveTasks);
        }
      }
     addtask(){
      if(this.newlist.trim()){
        this.lists.push(this.newlist.trim());
        this.newlist='';
        this.saveTasks();
        
      }
    }
      removetask(index: number) {
        this.lists.splice(index,1);
        this.saveTasks();
      }
      saveTasks(){
        localStorage.setItem('tasks',JSON.stringify(this.lists));
}

userData:any;

onFormdata(data:{email:string,password:string}){
  this.userData=data;
}
  newRole:string="";
 role:string=''
    constructor(private roleservice:RoleService){
      this.roleservice.$currentRole.subscribe(role=>{
    this.role=role;
      })
    }
    updateRole(){
      this.roleservice.setRole("Admin");
    }
    inputRole(){
      this.roleservice.setRole(this.newRole);
      this.newRole='';
    }



}
