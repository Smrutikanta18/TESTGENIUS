import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';
import { QuizService } from '../../../services/quiz.service';


@Component({
  selector: 'app-update-quiz',
  standalone: true,
  imports: [FormsModule,MatButtonModule,MatFormFieldModule,MatSelectModule,MatInputModule,MatSlideToggleModule],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit{

  constructor(private route:ActivatedRoute,private _Quiz:QuizService,private snak:MatSnackBar,
    private _cat:CategoryService
  ){}


  qId=0;
  quiz:any;
  categories:any;
  ngOnInit(): void {
      this.qId =this.route.snapshot.params['qid'];
      
      this._Quiz.getQuiz(this.qId).subscribe((data:any)=>{
        this.quiz=data;
      },
    (error)=>{
      this.snak.open('Error in loading Category','Error in loading Category',{
        duration:3000
      });
    });

    this._cat.categories().subscribe((data:any)=>{
      this.categories=data;
    },(error)=>{
      this.snak.open('Error in loading Category','Error in loading Category',{
        duration:3000
      })
    });
  }

  public updateQuiz(){
    this._Quiz.updateQuiz(this.quiz).subscribe((data:any)=>{
      Swal.fire('success !','Quiz Updated','success');
    },(error)=>{
      Swal.fire('Error !','Quiz is not Updated','success');

    })
  }
}
