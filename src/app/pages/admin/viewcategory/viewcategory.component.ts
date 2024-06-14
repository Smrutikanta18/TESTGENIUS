import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-viewcategory',
  standalone: true,
  imports: [MatCardModule,MatListModule,MatIconModule,CommonModule],
  templateUrl: './viewcategory.component.html',
  styleUrl: './viewcategory.component.css'
})
export class ViewcategoryComponent implements OnInit{

categories:any;
  constructor(private category:CategoryService,private snak:MatSnackBar,
    private router:Router
  ){}

  ngOnInit(): void {
      this.category.categories().subscribe((data: any)=>
      {
        this.categories=data;
      },
      (error)=>{
        this.snak.open("Error Not found",'',{
          duration:3000
        });
      }
    );
  }
  public NaviagteToAddcategory() {
    this.router.navigate(['admin/add_category']);
  }
  deleteQuiz(cid:any){
    this.category.deleteCategory(cid).subscribe((data:any)=>{
      this.categories= this.categories.filter((cat:any)=>cat.cid != cid)
      this.snak.open('Success','Quiz deleted',{
        duration:3000
      });
    },
  (error:any)=>{
    this.snak.open('Error','Quiz not deleted',{
      duration:3000
    });
  });
  }

}
