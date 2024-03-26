package com.prodemy.backendspring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.prodemy.backendspring.model.Category;
import com.prodemy.backendspring.model.response.CategoryResponse;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query("select new com.prodemy.backendspring.model.response.CategoryResponse(c.id , c.name, count(p.category.id)) from Product p right join Category c on p.category.id = c.id group by p.category.id")
    List<CategoryResponse> findAllWithProductsCount();

    @Query("select new com.prodemy.backendspring.model.response.CategoryResponse(c.id , c.name, count(p.category.id)) from Product p right join Category c on p.category.id = c.id  where c.id = ?1 group by p.category.id ")
    CategoryResponse findAllWithProductsCountById(Integer id);

}
