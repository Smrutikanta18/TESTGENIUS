import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [FormsModule,MatButtonModule,MatFormFieldModule,MatSelectModule,MatInputModule,MatSlideToggleModule],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit {

  categories:any;

  quiz={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:''
    }

  }

  constructor(private snak:MatSnackBar,private quizService:QuizService
    ,private categoryService:CategoryService
  ){}

  ngOnInit(): void {

      this.categoryService.categories().subscribe((data:any)=>{
        this.categories=data;
      },
    (error)=>{
      this.snak.open('Error','',{
        duration:3000
      });
    });

  }
  formSubmit(){
    if(this.quiz.title.trim()==''||this.quiz.title==null){
      this.snak.open('Title required','',{
        duration:3000
      });
      return;
    }

    this.quizService.addCategory(this.quiz).subscribe((data:any)=>
    {
      this.quiz.title='';
      this.quiz.description='';
      this.quiz.maxMarks='';
      this.quiz.numberOfQuestions='';
      this.quiz.active=true;
      this.quiz.category={
        cid:''
      };
      this.snak.open('Successfully added','',{
        duration:3000
      });
    },
  (error)=>{
    this.snak.open('UnSuccessfull','',{
      duration:3000
    });
  }
  );
  }

}

