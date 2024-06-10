package com.project.GiveTest.controller;

import com.project.GiveTest.entities.exam.Category;
import com.project.GiveTest.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/")
    public ResponseEntity<?> addCategory(
            @RequestBody Category category
            ){
        Category category1=this.categoryService.addCategory(category);
        return ResponseEntity.ok(category1);
    }

    @GetMapping("/{cId}")
    public Category getCategory(
            @PathVariable("cId") Long cId
    ){
        return this.categoryService.getCategory(cId);
    }

    @GetMapping("/")
    public ResponseEntity<?> getCategories(){
        return ResponseEntity.ok(this.categoryService.getCategories());
    }

    @PutMapping("/")
    public Category updateCategory(
            @RequestBody Category category
    ){
        return this.categoryService.updateCategory(category);
    }

    @DeleteMapping("/{cid}")
    public void deleteCategory(@PathVariable("cid") Long cid){
        this.categoryService.deleteCategory(cid);
    }

}
