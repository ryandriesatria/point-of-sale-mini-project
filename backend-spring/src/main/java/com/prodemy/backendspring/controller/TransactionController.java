package com.prodemy.backendspring.controller;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.prodemy.backendspring.model.Transaction;
import com.prodemy.backendspring.model.TransactionDetail;
import com.prodemy.backendspring.model.request.TransactionRequest;
import com.prodemy.backendspring.model.response.HttpResponseModel;
import com.prodemy.backendspring.service.TransactionDetailService;
import com.prodemy.backendspring.service.TransactionService;

import jakarta.validation.Valid;

@CrossOrigin
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
    public HttpResponseModel<List<Transaction>> getAllTransaction(@RequestParam Optional<String> start_date,
            @RequestParam Optional<String> end_date) throws ParseException {
        HttpResponseModel<List<Transaction>> resp = new HttpResponseModel<>();

        resp.setStatus(200);
        resp.setMessage("OK");

        resp.setData(transactionService.getAllTransaction(start_date, end_date));
        return resp;
    }

    @GetMapping("/{id}")
    public HttpResponseModel<Transaction> getTransactionById(@PathVariable Integer id) {
        HttpResponseModel<Transaction> resp = new HttpResponseModel<>();

        Transaction data = transactionService.getTransactionById(id);

        resp.setMessage("OK");
        resp.setStatus(200);
        resp.setData(data);
        return resp;
    }

    @GetMapping("/{id}/detail")
    public HttpResponseModel<List<TransactionDetail>> getTransactionDetailById(@PathVariable Integer id) {
        HttpResponseModel<List<TransactionDetail>> resp = new HttpResponseModel<>();

        List<TransactionDetail> data = transactionDetailService.getTransactionDetailById(id);

        resp.setMessage("OK");
        resp.setStatus(200);
        resp.setData(data);
        return resp;
    }
}
