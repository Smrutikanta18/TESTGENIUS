import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatCardModule,MatListModule,FormsModule,MatCard,MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router:Router,private login: LoginService){

  }
  public navigateToProfile() {
    this.router.navigate(['admin/profile']);
}
public navigateToHome(){
  this.router.navigate(['admin']);
}
public logout(){
  this.login.logout();
  window.location.reload();
}
public navigateToCategory() {
  this.router.navigate(['admin/category']);
}
public navigateToadd() {
  this.router.navigate(['admin/add_category']);
}
public navigateToQuiz(){
  this.router.navigate(['admin/quiz']);
}
public navigateToaddquiz(){
  this.router.navigate(['admin/add_quiz']);
}

}
