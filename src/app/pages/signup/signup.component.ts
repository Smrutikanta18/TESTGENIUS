import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,
    HttpClientModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  constructor(private userservice : UserService){}

  public user={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:'',

  };

  ngOnInit(): void {
      
  }
  formSubmit(){
    console.log(this.user);
    if(this.user.username==''||this.user.username==null){
      alert('User required');
      return;
    }

    this.userservice.addUser(this.user).subscribe(
      (data)=>{
        console.log(data);
        alert('success');
      },
      (error)=>{
        console.log(error);
        alert('something went wrong');
      }
    );
  }


}
