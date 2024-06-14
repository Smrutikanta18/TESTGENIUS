import { CommonModule, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule,MatDivider,FormsModule,RouterModule,MatProgressSpinnerModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit{

  qid:any;
  Question:any;

  marksGot=0;
  correctAnswers=0;
  attempted=0;

  isSubmit=false;

  timer:any;

  constructor(private locationst:LocationStrategy,private route:ActivatedRoute
    ,private _ques:QuestionService
  ){

  }

  ngOnInit(): void {
      this.preventBackBotton();
      this.qid=this.route.snapshot.params['qid'];

      this._ques.getQuestionsForQuiz(this.qid).subscribe((data:any)=>{
        this.Question=data;

        this.timer=this.Question.length * 2 * 60; 

        this.Question.forEach((q:any)=>{
          q['givenAnswer']='';
        })

        console.log(data);
        this.startTimer();
      });
  }
  preventBackBotton(){
    history.pushState(null, "", location.href);
    this.locationst.onPopState(()=>{
      history.pushState(null,"",location.href);
    });
  }

  submitQuiz(){
    Swal.fire({
      title: "Do you want to Submit the Quiz?",
      showCancelButton: true,
      confirmButtonText: "Submit",
      denyButtonText: `Don't save`
    }).then((e:any) => {
      
      if (e.isConfirmed) {
        this.evalQuiz();
      } else if (e.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  startTimer(){
    let t= window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz(){
    this.isSubmit=true;
    this.Question.forEach((q:any)=>{
      if(q.givenAnswer == q.answer){
        this.correctAnswers++;
        let singleMark=this.Question[0].quiz.maxMarks / this.Question.length;
        this.marksGot+=singleMark;
      }
      if(q.givenAnswer.trim() != ''){
        this.attempted++;
      }
    });
  }

}
