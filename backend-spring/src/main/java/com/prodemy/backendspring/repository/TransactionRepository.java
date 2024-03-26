package com.prodemy.backendspring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prodemy.backendspring.model.Transaction;
import java.util.Date;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    List<Transaction> findByTransactionDateGreaterThanEqual(Date start_date);

    List<Transaction> findByTransactionDateLessThanEqual(Date end_date);

    List<Transaction> findByTransactionDateGreaterThanEqualAndTransactionDateLessThanEqual(Date start_date,
            Date end_date);
}
