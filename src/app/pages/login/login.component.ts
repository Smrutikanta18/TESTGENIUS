import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule,MatFormFieldModule,FormsModule,MatInputModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

loginData = {
  username:'',
  password:'',
};

constructor(private snak:MatSnackBar,private login:LoginService , private router:Router){

}
ngOnInit(): void {
    
}

formSubmit(){

  if(this.loginData.username.trim()=='' || this.loginData.username==null){

    this.snak.open('Username is required ','',{
      duration: 3000,
    });
    return;
  }

  if(this.loginData.password.trim()=='' || this.loginData.password==null){

    this.snak.open('Password is required ','',{
      duration: 3000,
    });
    return;
  }
  this.login.generateToken(this.loginData).subscribe(
  (data: any)=>{
    console.log(data);

    this.login.loginUser(data.token);

    this.login.getCurrentUser().subscribe((
      user: any
    )=>{
        this.login.setUser(user);
        console.log(user);

        if(this.login.getUserRole() == "Admin"){

          this.router.navigate(['admin']);
          this.login.loginStatusSubject.next(true);

        }else if(this.login.getUserRole() == "Normal"){

          this.router.navigate(['user-dashboard/0']);
          this.login.loginStatusSubject.next(true);
        }else{
          this.login.logout();
          
        }
    }
  );

  },
  (error)=>{
    console.log(error);
    this.snak.open("Invalid details -- Try again",'',{
      duration:3000,
    });
  }
);

}

}
