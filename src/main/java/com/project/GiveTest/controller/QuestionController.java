package com.project.GiveTest.controller;

import com.project.GiveTest.entities.exam.Question;
import com.project.GiveTest.entities.exam.Quiz;
import com.project.GiveTest.services.QuestionService;
import com.project.GiveTest.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question){
        return  ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question){
        return  ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestions(
            @PathVariable("qid") Long qid
    ){
        Quiz quiz=this.quizService.getQuiz(qid);
        Set<Question> questions=quiz.getQuestions();
        List<Question> list=new ArrayList(questions);
        if(list.size() >Integer.parseInt(quiz.getNumberOfQuestions())){
            list = list.subList(0,Integer.parseInt(quiz.getNumberOfQuestions()+1));
        }



        Collections.shuffle(list);
        return  ResponseEntity.ok(list);
    }
    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsAdmin(
            @PathVariable("qid") Long qid
    ){
        Quiz quiz=new Quiz();
        quiz.setqId(qid);
        Set<Question> questionOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return  ResponseEntity.ok(questionOfQuiz);
    }

    @GetMapping("/{queId}")
    public ResponseEntity<Question> getQuestion(
            @PathVariable("queId") Long queId
    ){
        return  ResponseEntity.ok(this.questionService.getQuestion(queId));
    }

    @DeleteMapping("/{queId}")
    public void delete(
            @PathVariable("queId") Long queId
    ){
        this.questionService.deleteQuestion(queId);
    }


}
