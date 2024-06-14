import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { LoadQuizComponent } from '../load-quiz/load-quiz.component';

@Component({
  selector: 'app-sidebar1',
  standalone: true,
  imports: [RouterModule,LoadQuizComponent,CommonModule],
  templateUrl: './sidebar1.component.html',
  styleUrl: './sidebar1.component.css'
})
export class Sidebar1Component implements OnInit{

  categories:any;

  constructor(private snak:MatSnackBar,private cat:CategoryService,){

  }

  ngOnInit(): void {
      this.cat.categories().subscribe((data:any)=>{
        this.categories=data;
      },
    (error:any)=>{
      this.snak.open("Error in loading catagory from server",'',{
        duration:3000,
      });
    });
  }
  
}
