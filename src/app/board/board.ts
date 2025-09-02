import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [NgForOf],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class Board {
    tasks = ['Learn Angular', 'Install Tailwind', 'Build Taskboard'];

}
