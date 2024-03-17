package com.prodemy.backendspring.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.prodemy.backendspring.model.Product;
import com.prodemy.backendspring.model.request.ProductRequest;
import com.prodemy.backendspring.model.response.HttpResponseModel;
import com.prodemy.backendspring.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public HttpResponseModel<Product> addProduct(@Valid @RequestBody ProductRequest productRequest) {
        HttpResponseModel<Product> resp = new HttpResponseModel<>();

        productService.addProduct(productRequest);
        resp.setStatus(201);
        resp.setMessage("Successfully created");

        return resp;
    }

    @GetMapping
    public HttpResponseModel<List<Product>> getAllProduct(@RequestParam Optional<String> title,
            @RequestParam Optional<String> category_id, @RequestParam Optional<String> sort_by,
            @RequestParam Optional<String> sort_order) {
        HttpResponseModel<List<Product>> resp = new HttpResponseModel<>();

        resp.setData(productService.getAllProduct(title.orElse(null), category_id.orElse(null), sort_by.orElse(null),
                sort_order.orElse(null)));

        resp.setStatus(200);
        resp.setMessage("OK");

        return resp;
    }

    @GetMapping("/{id}")
    public HttpResponseModel<Product> getProductById(@PathVariable Integer id) {
        HttpResponseModel<Product> resp = new HttpResponseModel<>();

        Product data = productService.getProductById(id);

        if (data == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Product Not Found");
        }
        resp.setStatus(200);
        resp.setMessage("OK");
        resp.setData(data);

        return resp;
    }

    @DeleteMapping("/{id}")
    public HttpResponseModel<?> deleteProductById(@PathVariable Integer id) {
        HttpResponseModel<?> resp = new HttpResponseModel<>();

        productService.deleteProduct(id);
        resp.setStatus(200);
        resp.setMessage("Success");

        return resp;
    }

    @PutMapping("/{id}")
    public HttpResponseModel<?> editProductById(@PathVariable Integer id,
            @Valid @RequestBody ProductRequest productRequest) {
        HttpResponseModel<?> resp = new HttpResponseModel<>();

        productService.editProduct(productRequest, id);
        resp.setStatus(200);
        resp.setMessage("Success");

        return resp;
    }

}
