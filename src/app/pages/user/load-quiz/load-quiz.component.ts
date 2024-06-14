import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  standalone: true,
  imports: [CommonModule,MatCardModule,RouterModule],
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent implements OnInit{

  catId:any;
  quizes:any;

  constructor(private _route:ActivatedRoute,private quiz:QuizService,private snak:MatSnackBar){}

ngOnInit(): void {

  this._route.params.subscribe((params:any)=>{
    this.catId=params['catId'];
    if(this.catId == 0){
      this.quiz.getActiveQuizzes().subscribe((data:any)=>{
        this.quizes=data;
      },
      (error)=>{
        this.snak.open('Error is there','',{
          duration:3000
        })
      });
    }else{
      this.quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data:any)=>{
        this.quizes=data;
      },
    (error:any)=>{
      this.snak.open('Error in loading category','',{
        duration:3000
      });
    });
    }
  });

    

    
}
}
