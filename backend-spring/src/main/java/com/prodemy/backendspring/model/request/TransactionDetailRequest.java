package com.prodemy.backendspring.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionDetailRequest {

    @NotNull(message = "Product ID is Mandatory")
    private Integer product_id;

    @NotNull(message = "Quantity is Mandatory")
    private Integer quantity;

    @NotNull(message = "Subtotal Amount is Mandatory")
    private Integer subtotal;
}
