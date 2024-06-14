import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-view-quiz-question',
  standalone: true,
  imports: [MatCard,MatCardContent,MatIcon,CommonModule,MatDivider,MatButton,RouterModule],
  templateUrl: './view-quiz-question.component.html',
  styleUrl: './view-quiz-question.component.css'
})
export class ViewQuizQuestionComponent implements OnInit{

  constructor(private route:ActivatedRoute,private question:QuestionService,private snak:MatSnackBar){}
  qId:any;
  qTitle:any;

  questions:any;

  ngOnInit(): void {
      this.qId=this.route.snapshot.params['qid'];
      this.qTitle=this.route.snapshot.params['title'];

      this.question.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>{
        this.questions=data;
        console.log(data);
      });
      
  }
  deleteQuestion(qId:any){
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure to delete',
    }).then((result:any)=>{
      if(result.isConfirmed){
        this.question.deleteQuestion(qId).subscribe((data:any)=>{
          this.snak.open('Deleted','Quiz deleted',{
            duration:3000
          });
          this.questions=this.questions.filter((Que:any)=>Que.qId != qId);
        },
      (error)=>{
        this.snak.open('Error','Quiz not deleted',{
              duration:3000
           });
      });
      }
    });
  
  }

}
