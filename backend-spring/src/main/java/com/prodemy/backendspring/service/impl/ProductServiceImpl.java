package com.prodemy.backendspring.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.prodemy.backendspring.model.Category;
import com.prodemy.backendspring.model.Product;
import com.prodemy.backendspring.model.request.ProductRequest;
import com.prodemy.backendspring.repository.CategoryRepository;
import com.prodemy.backendspring.repository.ProductRepository;
import com.prodemy.backendspring.service.ProductService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void addProduct(ProductRequest productRequest) {
        Product entity = Product.builder()
                .title(productRequest.getTitle())
                .price(productRequest.getPrice())
                .image(productRequest.getImage())
                .category(categoryRepository.getReferenceById(productRequest.getCategory_id()))
                .build();
        productRepository.save(entity);

    }

    @Override
    public List<Product> getAllProduct(String title, String category_id, String sort_by, String sort_order) {
        if (title == null && category_id == null) {
            if (sort_by != null) {
                if (sort_order.equals("desc")) {
                    return productRepository.findAll(Sort.by(Sort.Direction.DESC, sort_by));
                }
                return productRepository.findAll(Sort.by(Sort.Direction.ASC, sort_by));
            }
            return productRepository.findAll();

        } else if (category_id == null) {
            if (sort_by != null) {
                if (sort_order.equals("desc")) {
                    return productRepository.findByTitleContains(title, Sort.by(Sort.Direction.DESC, sort_by));
                }
                return productRepository.findByTitleContains(title, Sort.by(Sort.Direction.ASC, sort_by));
            }
            return productRepository.findByTitleContains(title);
        } else {
            Optional<Category> cat = categoryRepository.findById(Integer.parseInt(category_id));

            if (sort_by != null) {
                if (sort_order.equals("desc")) {
                    return productRepository.findByTitleContainsAndCategory(title != null ? title : "",
                            cat.orElse(null), Sort.by(Sort.Direction.DESC, sort_by));
                }
                return productRepository.findByTitleContainsAndCategory(title != null ? title : "", cat.orElse(null),
                        Sort.by(Sort.Direction.ASC, sort_by));
            }
            return productRepository.findByTitleContainsAndCategory(title != null ? title : "", cat.orElse(null));
        }
    }

    @Override
    public void editProduct(ProductRequest productRequest, Integer id) {
        Product entity = productRepository.findById(id).get();

        entity.setId(id);
        entity.setTitle(productRequest.getTitle());
        entity.setPrice(productRequest.getPrice());
        entity.setImage(productRequest.getImage());
        entity.setCategory(categoryRepository.getReferenceById(productRequest.getCategory_id()));

        productRepository.save(entity);

    }

    @Override
    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }

    @Override
    public Product getProductById(Integer id) {
        Optional<Product> op = productRepository.findById(id);
        if (!op.isPresent()) {
            return null;
        }
        return op.get();
    }

}
