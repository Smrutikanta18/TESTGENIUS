import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-instruction',
  standalone: true,
  imports: [RouterModule,],
  templateUrl: './instruction.component.html',
  styleUrl: './instruction.component.css'
})
export class InstructionComponent  implements OnInit{

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

  startQuiz(){
    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Start",
      denyButtonText: `Don't save`
    }).then((result:any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/start/'+this.qid])
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

}
