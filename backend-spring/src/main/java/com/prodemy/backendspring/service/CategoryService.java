package com.prodemy.backendspring.service;

import java.util.List;

import com.prodemy.backendspring.model.Category;
import com.prodemy.backendspring.model.request.CategoryRequest;
import com.prodemy.backendspring.model.response.CategoryResponse;

public interface CategoryService {
    public List<Category> getAllCategories();

    public List<CategoryResponse> getAllCategoriesWithProductCount();

    public CategoryResponse getAllCategoriesWithProductCountById(Integer id);

    public void addCategory(CategoryRequest categoryRequest);

    public void deleteCategoryById(Integer id);

    public void editCategory(CategoryRequest categoryRequest, Integer id);

}
