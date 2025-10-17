import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service';
import { UpperCasePipe } from '@angular/common';


@Component({
  selector: 'app-profile',
  imports: [UpperCasePipe],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile  implements OnInit{
  user:any;
  constructor(private userService:UserService){}

  ngOnInit(){
  this.user=this.userService.getUser();
  }
}
