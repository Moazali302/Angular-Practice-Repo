import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
 private $roleSource=new BehaviorSubject <string>("Guest");
  $currentRole=this.$roleSource.asObservable();

  setRole(newRole:string){
     this.$roleSource.next(newRole);
  }
}
