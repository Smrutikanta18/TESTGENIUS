import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';


@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,CommonModule,MatButtonModule,MatInputModule,FormsModule,MatSelectModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit{

  constructor(private route:ActivatedRoute,private _service:QuestionService,private snap:MatSnackBar){}

  qId:any;
  title:any;
  question={
    quiz:{
      qId:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  };

  ngOnInit(): void {
    this.qId =this.route.snapshot.params['qid'];
    this.title=this.route.snapshot.params['title'];

    this.question.quiz.qId=this.qId;
  }

  formSubmit(){

    if(this.question.content.trim() == '' || this.question.content == null){
      return;
    }

    this._service.postQuestionOfQuiz(this.question).subscribe((data:any)=>{
      this.snap.open('Added','Question Added',{
        duration:3000
      });
    },
    (error:any)=>{
      alert('Question not added successfully');
      this.snap.open('Error','Question not added',{
        duration:3000
     });
    }
  );

  }

}
