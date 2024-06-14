import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private Http:HttpClient) { }


  public Quizzes(){
    return this.Http.get(`${baseUrl}/quiz/`)
  }

  public addCategory(quiz:any){
    return this.Http.post(`${baseUrl}/quiz/`,quiz)
  }
  public deleteQuiz(qId:any){
    return this.Http.delete(`${baseUrl}/quiz/${qId}`);
  }

  public updateQuiz(quiz:any){
    return this.Http.put(`${baseUrl}/quiz/`,quiz);
  }

  public getQuiz(qId:any){
    return this.Http.get(`${baseUrl}/quiz/${qId}`);
  }

  public getQuizzesOfCategory(cid:any){
    return this.Http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  public getActiveQuizzes(){
    return this.Http.get(`${baseUrl}/quiz/active`)
  }

  public getActiveQuizzesOfCategory(cid:any){
    return this.Http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }
}
