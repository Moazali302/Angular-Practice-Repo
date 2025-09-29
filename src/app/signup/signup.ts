import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    skills: new FormArray([new FormControl('Angular')])
  });

  
  get skills() {
    return this.signupForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(new FormControl(''));
  }

  removeSkill(i: number) {
    this.skills.removeAt(i);
  }

  onSubmit() {
  if (this.signupForm.valid) {
  
    localStorage.setItem('signupData', JSON.stringify(this.signupForm.value));
    console.log('Saved to localStorage:', this.signupForm.value);
    alert('Signup successful! Data saved to localStorage.');
    this.signupForm.reset();
    this.skills.clear();
    this.skills.push(new FormControl(''));  
  }
}

}
