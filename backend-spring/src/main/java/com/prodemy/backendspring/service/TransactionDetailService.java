package com.prodemy.backendspring.service;

import java.util.List;

import com.prodemy.backendspring.model.TransactionDetail;

public interface TransactionDetailService {
    public List<TransactionDetail> getTransactionDetailById(Integer id);
}
