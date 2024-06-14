import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [MatFormFieldModule,MatButtonModule,MatInputModule,FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit{

  category={
    title:'',
    description:''
  }

  constructor(private categoryservice:CategoryService,private snak:MatSnackBar){}

  ngOnInit(): void {
      
  }

  formSubmit(){
    if(this.category.title.trim()==''||this.category.title==null){
      this.snak.open('Title required','',{
        duration:3000
      });
      return;
    }

    this.categoryservice.addCategory(this.category).subscribe((data:any)=>
    {
      this.category.title='';
      this.category.description='';
      this.snak.open('Successfully added','',{
        duration:3000
      });
    },
  (error)=>{
    this.snak.open('Successfully added','',{
      duration:3000
    });
  }
  );
  }

}
