package com.prodemy.backendspring.service;

import java.util.List;

import com.prodemy.backendspring.model.Transaction;
import com.prodemy.backendspring.model.request.TransactionRequest;

public interface TransactionService {
    public void addTransaction(TransactionRequest transactionRequest);

    public List<Transaction> getAllTransaction();

}
