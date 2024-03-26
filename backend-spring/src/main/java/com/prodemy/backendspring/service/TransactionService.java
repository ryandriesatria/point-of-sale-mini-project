package com.prodemy.backendspring.service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.prodemy.backendspring.model.Transaction;
import com.prodemy.backendspring.model.request.TransactionRequest;

public interface TransactionService {
    public void addTransaction(TransactionRequest transactionRequest);

    public List<Transaction> getAllTransaction(Optional<String> start_date, Optional<String> end_date)
            throws ParseException;

    public Transaction getTransactionById(Integer id);

}
