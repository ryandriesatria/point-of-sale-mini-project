package com.prodemy.backendspring.model.request;

import java.util.Date;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionRequest {

    @NotNull(message = "Total Amount is Mandatory")
    private Integer total_amount;

    @NotNull(message = "Total Pay is Mandatory")
    private Integer total_pay;

    @NotNull(message = "Transaction Date is Mandatory")
    private Date transaction_date;

    @Valid
    @NotNull(message = "Transaction Detail is Mandatory")
    private List<TransactionDetailRequest> transactionDetails;

}
