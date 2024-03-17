package com.prodemy.backendspring.model.request;

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
public class ProductRequest {
    @NotBlank(message = "Title is Mandatory")
    private String title;

    @NotBlank(message = "Image is Mandatory")
    private String image;

    @NotNull(message = "Price is Mandatory")
    private Integer price;

    @NotNull(message = "Category ID is Mandatory")
    private Integer category_id;

}
