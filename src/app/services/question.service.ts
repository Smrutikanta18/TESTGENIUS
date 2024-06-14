import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient,) { }

  getQuestionsOfQuiz(qid:any){
    return this.http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }
  getQuestionsForQuiz(qid:any){
    return this.http.get(`${baseUrl}/question/quiz/${qid}`);
  }
  postQuestionOfQuiz(question:any){
    return this.http.post(`${baseUrl}/question/`,question);
  }
  deleteQuestion(questionId:any){
    return this.http.delete(`${baseUrl}/question/${questionId}`);
  }

}
