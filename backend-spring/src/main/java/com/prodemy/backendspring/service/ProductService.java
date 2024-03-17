package com.prodemy.backendspring.service;

import java.util.List;

import com.prodemy.backendspring.model.Product;
import com.prodemy.backendspring.model.request.ProductRequest;

public interface ProductService {

    public void addProduct(ProductRequest productRequest);

    public List<Product> getAllProduct(String title, String category_id, String sort_by, String sort_order);

    public void editProduct(ProductRequest productRequest, Integer id);

    public void deleteProduct(Integer id);

    public Product getProductById(Integer id);

}
