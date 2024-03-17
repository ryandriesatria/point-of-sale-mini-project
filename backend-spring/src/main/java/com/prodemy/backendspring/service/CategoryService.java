package com.prodemy.backendspring.service;

import java.util.List;

import com.prodemy.backendspring.model.Category;
import com.prodemy.backendspring.model.request.CategoryRequest;

public interface CategoryService {
    public List<Category> getAllCategories();

}
