import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  imports: [NgForOf,FormsModule],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class Board {
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
}
