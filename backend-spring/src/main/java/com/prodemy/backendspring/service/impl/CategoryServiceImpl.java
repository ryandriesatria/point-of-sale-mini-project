package com.prodemy.backendspring.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.prodemy.backendspring.model.Category;
import com.prodemy.backendspring.model.request.CategoryRequest;
import com.prodemy.backendspring.model.response.CategoryResponse;
import com.prodemy.backendspring.repository.CategoryRepository;
import com.prodemy.backendspring.service.CategoryService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public List<CategoryResponse> getAllCategoriesWithProductCount() {

        return categoryRepository.findAllWithProductsCount();
    }

    @Override
    public CategoryResponse getAllCategoriesWithProductCountById(Integer id) {
        return categoryRepository.findAllWithProductsCountById(id);
    }

    @Override
    public void addCategory(CategoryRequest categoryRequest) {
        Category entity = Category.builder().name(categoryRequest.getName()).build();

        categoryRepository.save(entity);
    }

    @Override
    public void deleteCategoryById(Integer id) {
        CategoryResponse category = categoryRepository.findAllWithProductsCountById(id);

        if (category.getProduct_count() != 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Category must not have product registered to be deleted!");
        } else {
            categoryRepository.deleteById(id);
        }

    }

    @Override
    public void editCategory(CategoryRequest categoryRequest, Integer id) {
        Category entity = categoryRepository.findById(id).get();

        entity.setName(categoryRequest.getName());

        categoryRepository.save(entity);

    }

}
