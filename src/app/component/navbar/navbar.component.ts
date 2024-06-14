import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,CommonModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  isLoggedIn=false;
  user=null;

  constructor(public login : LoginService,public router:Router){

  }
  ngOnInit(): void {
      this.isLoggedIn=this.login.isLoggedIn();
      this.user=this.login.getUser();
      this.login.loginStatusSubject.asObservable().subscribe(
        (data) => {
          this.isLoggedIn=this.login.isLoggedIn();
          this.user=this.login.getUser();
        }
      )
  }
  public logout(){
    this.login.logout();
    window.location.reload();
  }

  public navigateToHome(){
    return this.router.navigate(['admin/profile']);
  }

}
