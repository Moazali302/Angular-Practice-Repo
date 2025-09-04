import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgForOf, FormsModule, NgFor,NgIf],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
    tasks = ['Learn Angular', 'Install Tailwind', 'Build Taskboard'];
   name="Muaz Ali ";
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
}