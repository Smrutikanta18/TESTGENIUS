package com.project.GiveTest.repositories;

import com.project.GiveTest.entities.exam.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface CategoryRepository extends JpaRepository<Category,Long> {


}
