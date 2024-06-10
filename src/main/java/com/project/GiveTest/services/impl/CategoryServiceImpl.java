package com.project.GiveTest.services.impl;

import com.project.GiveTest.entities.exam.Category;
import com.project.GiveTest.repositories.CategoryRepository;
import com.project.GiveTest.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category addCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Set<Category> getCategories() {
        return new LinkedHashSet<>(this.categoryRepository.findAll());
    }

    @Override
    public Category getCategory(Long cid) {
        return this.categoryRepository.findById(cid).get();
    }

    @Override
    public void deleteCategory(Long cid) {
        Category c=new Category();
        c.setCid(cid);
        this.categoryRepository.delete(c);
    }
}
