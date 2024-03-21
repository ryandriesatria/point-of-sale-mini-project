package com.prodemy.backendspring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prodemy.backendspring.model.Product;
import com.prodemy.backendspring.model.Transaction;
import com.prodemy.backendspring.model.TransactionDetail;

@Repository
public interface TransactionDetailRepository extends JpaRepository<TransactionDetail, Integer> {

    List<TransactionDetail> findByTransaction(Transaction transaction);

    List<TransactionDetail> findByProduct(Product product);
}
