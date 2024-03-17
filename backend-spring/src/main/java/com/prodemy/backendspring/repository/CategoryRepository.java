package com.prodemy.backendspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prodemy.backendspring.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
