package com.prodemy.backendspring.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prodemy.backendspring.model.Transaction;
import com.prodemy.backendspring.model.TransactionDetail;
import com.prodemy.backendspring.model.request.TransactionRequest;
import com.prodemy.backendspring.repository.ProductRepository;
import com.prodemy.backendspring.repository.TransactionDetailRepository;
import com.prodemy.backendspring.repository.TransactionRepository;
import com.prodemy.backendspring.service.TransactionService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionDetailRepository transactionDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void addTransaction(TransactionRequest transactionRequest) {
        // List<TransactionDetail> transactionDetails =
        // transactionRequest.getTransactionDetails().stream().map(x
        // ->TransactionDetail.builder().);

        Transaction entity = Transaction.builder()
                .transaction_date(transactionRequest.getTransaction_date())
                .total_amount(transactionRequest.getTotal_amount())
                .total_pay(transactionRequest.getTotal_pay())
                .build();

        Integer id = transactionRepository.save(entity).getId();

        transactionRequest.getTransactionDetails().stream()
                .forEach(x -> transactionDetailRepository.save(TransactionDetail.builder()
                        .quantity(x.getQuantity())
                        .subtotal(x.getSubtotal())
                        .product(productRepository.findById(x.getProduct_id()).get())
                        .transaction(transactionRepository.findById(id).get())
                        .build()));

    }

    @Override
    public List<Transaction> getAllTransaction() {

        return transactionRepository.findAll();
    }

    @Override
    public Transaction getTransactionById(Integer id) {
        Optional<Transaction> op = transactionRepository.findById(id);

        if (!op.isPresent()) {
            return null;
        }
        return op.get();

    }

}
