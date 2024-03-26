package com.prodemy.backendspring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prodemy.backendspring.model.Category;
import com.prodemy.backendspring.model.request.CategoryRequest;
import com.prodemy.backendspring.model.request.ProductRequest;
import com.prodemy.backendspring.model.response.CategoryResponse;
import com.prodemy.backendspring.model.response.HttpResponseModel;
import com.prodemy.backendspring.service.CategoryService;

import jakarta.validation.Valid;

@CrossOrigin
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

    @GetMapping("/product_count")
    public HttpResponseModel<List<CategoryResponse>> getAllCategoriesWithProductsCount() {

        HttpResponseModel<List<CategoryResponse>> resp = new HttpResponseModel<>();

        resp.setMessage("OK");
        resp.setStatus(200);
        resp.setData(categoryService.getAllCategoriesWithProductCount());

        return resp;

    }

    @GetMapping("/product_count/{id}")
    public HttpResponseModel<CategoryResponse> getAllCategoriesWithProductsCountById(@PathVariable Integer id) {

        HttpResponseModel<CategoryResponse> resp = new HttpResponseModel<>();

        resp.setMessage("OK");
        resp.setStatus(200);
        resp.setData(categoryService.getAllCategoriesWithProductCountById(id));

        return resp;

    }

    @PostMapping()
    public HttpResponseModel<Category> addCategory(@Valid @RequestBody CategoryRequest categoryRequest) {
        categoryService.addCategory(categoryRequest);

        HttpResponseModel<Category> resp = new HttpResponseModel<>();

        resp.setMessage("Successfully Created");
        resp.setStatus(201);

        return resp;
    }

    @DeleteMapping("/{id}")
    public HttpResponseModel<?> deleteProductById(@PathVariable Integer id) {
        HttpResponseModel<?> resp = new HttpResponseModel<>();

        categoryService.deleteCategoryById(id);
        resp.setStatus(200);
        resp.setMessage("Success");

        return resp;
    }

    @PutMapping("/{id}")
    public HttpResponseModel<?> editProductById(@PathVariable Integer id,
            @Valid @RequestBody CategoryRequest categoryRequest) {
        HttpResponseModel<?> resp = new HttpResponseModel<>();

        categoryService.editCategory(categoryRequest, id);
        resp.setStatus(200);
        resp.setMessage("Success");

        return resp;
    }

}
