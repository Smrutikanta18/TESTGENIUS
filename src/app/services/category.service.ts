import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private Http: HttpClient) { }

  public categories(){
    return this.Http.get(`${baseUrl}/category/`);
  }

  public addCategory(category:any){
    return this.Http.post(`${baseUrl}/category/`,category)
  }

  public deleteCategory(cid:any){
    return this.Http.delete(`${baseUrl}/category/${cid}`);
  }
}
