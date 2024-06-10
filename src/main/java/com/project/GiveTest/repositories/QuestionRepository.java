package com.project.GiveTest.repositories;

import com.project.GiveTest.entities.exam.Question;
import com.project.GiveTest.entities.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface QuestionRepository extends JpaRepository<Question,Long> {
    Set<Question> findByQuiz(Quiz quiz);
}
