package com.project.GiveTest.services.impl;

import com.project.GiveTest.entities.exam.Question;
import com.project.GiveTest.entities.exam.Quiz;
import com.project.GiveTest.repositories.QuestionRepository;
import com.project.GiveTest.services.QuestionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.HashSet;
import java.util.Set;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question addQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public Set<Question> getQuestions() {
        return new HashSet<>(this.questionRepository.findAll());
    }

    @Override
    public Question getQuestion(Long questionId) {
        return this.questionRepository.findById(questionId).get();
    }

    @Override
    public Set<Question> getQuestionsOfQuiz(Quiz quiz) {
        return this.questionRepository.findByQuiz(quiz);
    }

    @Override
    public void deleteQuestion(Long qId) {
        if (questionRepository.existsById(qId)) {
            Question s= new Question();
            s.setqId(qId);
            this.questionRepository.delete(s);
        } else {
            throw new EntityNotFoundException("Question with ID " + qId + " not found");
        }
    }
}