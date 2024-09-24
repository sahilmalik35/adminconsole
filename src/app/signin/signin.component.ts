import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  signInForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder){
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    if (this.signInForm.valid){
      const {username, password } = this.signInForm.value;
      console.log('username', username);
      console.log('password', password); 
    }
  }
}
