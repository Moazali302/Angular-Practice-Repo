import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData = new BehaviorSubject<any>(null);
  user$ = this.userData.asObservable();

  setUser(data:any){
    this.userData.next(data);
    localStorage.setItem('user',JSON.stringify(data));
  }
  getUser(){
    return JSON.parse(localStorage.getItem("user")|| 'null');
  }
}