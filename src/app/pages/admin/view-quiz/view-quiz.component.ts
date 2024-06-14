import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-view-quiz',
  standalone: true,
  imports: [CommonModule,MatIconModule,RouterModule],
  templateUrl: './view-quiz.component.html',
  styleUrl: './view-quiz.component.css'
})
export class ViewQuizComponent implements OnInit{
  quizzes:any;
  constructor(private quiz:QuizService,private snak:MatSnackBar,
    private router:Router
  ){}

  ngOnInit(): void {
      this.quiz.Quizzes().subscribe((data: any)=>
      {
        this.quizzes=data;
      },
      (error)=>{
        this.snak.open("Error Not found",'',{
          duration:3000
        });
      }
    );
  }
  public NaviagteToAddaqiz() {
    this.router.navigate(['admin/add_quiz']);
  }

  deleteQuiz(qId:any){
    this.quiz.deleteQuiz(qId).subscribe((data:any)=>{
      this.quizzes= this.quizzes.filter((quiz:any)=>quiz.qId != qId)
      this.snak.open('Success','Quiz deleted',{
        duration:3000
      });
    },
  (error)=>{
    this.snak.open('Error','Quiz not deleted',{
      duration:3000
    });
  });
  }


}

