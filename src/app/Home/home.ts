import { ChangeDetectionStrategy, Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { NgForOf, NgFor, NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Contact } from "../contact/contact";
import { RoleService } from '../role-service';
import { TitleStrategy } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { HttpBackend, HttpRequest, httpResource } from '@angular/common/http';
import { SlicePipe } from '@angular/common';
import { TruncatePipe } from '../truncate-pipe';
@Component({
  selector: 'app-home',
  imports: [NgForOf, FormsModule, NgFor, NgIf, ReactiveFormsModule,
    Contact,SlicePipe, CurrencyPipe,TruncatePipe],
    changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, AfterViewInit {
    tasks = ['Learn Angular', 'Install Tailwind', 'Build Taskboard'];
   name:string ="";
   imgUrl="https://cdn.pixabay.com/photo/2017/02/26/00/05/cranium-2099129_1280.png";
   count=0;
   fees=50000.24;
  http: any;

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
  newRole: string = "";
  role: string = '';
  constructor(private roleservice: RoleService, private el: ElementRef) {
    this.roleservice.$currentRole.subscribe(role => {
      this.role = role;
    })
  }
  updateRole() {
    this.roleservice.setRole("Admin");
  }
  inputRole() {
    this.roleservice.setRole(this.newRole);
    this.newRole = '';
  }

  ngAfterViewInit(): void {
    // Intersection Observer for scroll-based fade/slide animations
    const sections = this.el.nativeElement.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15
      });
      sections.forEach((section: HTMLElement) => {
        observer.observe(section);
      });
    }
  }

  students :string[]=[
    'Ahmad','Faisal','Muaz','Adil','Noman','wahab','Ali','Usman'];

    allValue:string="Hello Welcome to Angular Custom Pipe";

}
