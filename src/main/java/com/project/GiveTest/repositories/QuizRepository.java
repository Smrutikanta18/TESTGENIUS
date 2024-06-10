package com.project.GiveTest.repositories;

import com.project.GiveTest.entities.exam.Category;
import com.project.GiveTest.entities.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz,Long> {
    public List<Quiz> findByCategory(Category c);

    public List<Quiz> findByActive(boolean b);

    public List<Quiz> findByCategoryAndActive(Category c,boolean b);
}
