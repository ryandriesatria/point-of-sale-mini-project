package com.prodemy.backendspring.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.TimeZone;

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
                .transactionDate(transactionRequest.getTransaction_date())
                .totalAmount(transactionRequest.getTotal_amount())
                .totalPay(transactionRequest.getTotal_pay())
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
    public List<Transaction> getAllTransaction(Optional<String> start_date, Optional<String> end_date)
            throws ParseException {

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Date start = start_date.isPresent() ? formatter.parse(start_date.get() + " 00:00:00") : null;
        Date end = end_date.isPresent() ? formatter.parse(end_date.get() + " 23:59:59") : null;
        System.out.println(end);
        if (start_date.isPresent() && end_date.isPresent()) {
            return transactionRepository.findByTransactionDateGreaterThanEqualAndTransactionDateLessThanEqual(start,
                    end);
        } else if (start_date.isPresent()) {
            return transactionRepository.findByTransactionDateGreaterThanEqual(start);
        } else if (end_date.isPresent()) {
            return transactionRepository.findByTransactionDateLessThanEqual(end);
        }

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
