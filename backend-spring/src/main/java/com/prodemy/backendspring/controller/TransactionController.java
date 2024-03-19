package com.prodemy.backendspring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.prodemy.backendspring.model.Transaction;
import com.prodemy.backendspring.model.TransactionDetail;
import com.prodemy.backendspring.model.request.TransactionRequest;
import com.prodemy.backendspring.model.response.HttpResponseModel;
import com.prodemy.backendspring.service.TransactionDetailService;
import com.prodemy.backendspring.service.TransactionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private TransactionDetailService transactionDetailService;

    @PostMapping
    public HttpResponseModel<?> addTransaction(@Valid @RequestBody TransactionRequest transactionRequest) {
        HttpResponseModel<?> resp = new HttpResponseModel<>();

        transactionService.addTransaction(transactionRequest);
        resp.setMessage("Successfully Created ");
        resp.setStatus(201);

        return resp;
    }

    @GetMapping
    public HttpResponseModel<List<Transaction>> getAllTransaction() {
        HttpResponseModel<List<Transaction>> resp = new HttpResponseModel<>();

        resp.setStatus(200);
        resp.setMessage("OK");
        resp.setData(transactionService.getAllTransaction());
        return resp;
    }

    @GetMapping("/{id}")
    public HttpResponseModel<List<TransactionDetail>> getTransactionDetailById(@PathVariable Integer id) {
        HttpResponseModel<List<TransactionDetail>> resp = new HttpResponseModel<>();

        List<TransactionDetail> data = transactionDetailService.getTransactionDetailById(id);

        resp.setMessage("OK");
        resp.setStatus(200);
        resp.setData(data);
        return resp;
    }
}
