package com.prodemy.backendspring.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prodemy.backendspring.model.TransactionDetail;
import com.prodemy.backendspring.repository.TransactionDetailRepository;
import com.prodemy.backendspring.repository.TransactionRepository;
import com.prodemy.backendspring.service.TransactionDetailService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TransactionDetailServiceImpl implements TransactionDetailService {

    @Autowired
    private TransactionDetailRepository transactionDetailRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public List<TransactionDetail> getTransactionDetailById(Integer id) {

        return transactionDetailRepository.findByTransaction(transactionRepository.findById(id).orElse(null));

    }

}
