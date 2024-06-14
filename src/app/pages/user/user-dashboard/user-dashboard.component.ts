import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar1Component } from '../sidebar1/sidebar1.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterOutlet,Sidebar1Component],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
