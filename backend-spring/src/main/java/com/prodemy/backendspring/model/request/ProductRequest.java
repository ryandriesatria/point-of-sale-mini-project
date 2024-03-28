package com.prodemy.backendspring.model.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
    @Max(value = 50)
    private String title;

    @NotBlank(message = "Image is Mandatory")
    private String image;

    @NotNull(message = "Price is Mandatory")
    @Positive(message = "Price Must Be Positive Number")
    private Integer price;

    @NotNull(message = "Category ID is Mandatory")
    private Integer category_id;

}
