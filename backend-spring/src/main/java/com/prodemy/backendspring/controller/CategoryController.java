package com.prodemy.backendspring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prodemy.backendspring.model.Category;
import com.prodemy.backendspring.model.response.HttpResponseModel;
import com.prodemy.backendspring.service.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public HttpResponseModel<List<Category>> getAllCategories() {

        HttpResponseModel<List<Category>> resp = new HttpResponseModel<>();

        resp.setMessage("OK");
        resp.setStatus(200);
        resp.setData(categoryService.getAllCategories());

        return resp;

    }
}
