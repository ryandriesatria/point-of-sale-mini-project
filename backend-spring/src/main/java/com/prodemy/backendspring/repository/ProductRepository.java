package com.prodemy.backendspring.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prodemy.backendspring.model.Category;
import com.prodemy.backendspring.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByTitleContains(String title);

    List<Product> findByTitleContains(String title, Sort sort);

    List<Product> findByTitleContainsAndCategory(String title, Category category);

    List<Product> findByTitleContainsAndCategory(String title, Category category, Sort sort);

}
