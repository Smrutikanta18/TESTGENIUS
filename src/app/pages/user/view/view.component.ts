import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit{
  
  qid:any;
  Quiz:any;

  constructor(private route:ActivatedRoute,private _quiz:QuizService,private router:Router){

  }

  ngOnInit(): void {
      this.qid=this.route.snapshot.params['qid'];

      this._quiz.getQuiz(this.qid).subscribe((data:any)=>{
        this.Quiz=data;
      },
    (error)=>{
      alert("Error in loading quiz data");
    });
  }
}
