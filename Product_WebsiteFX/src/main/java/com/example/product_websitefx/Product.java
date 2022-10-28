package com.example.product_websitefx;

public class Product {

    private Integer pid;
    private String name;
    private Integer price;
    private Integer quantity;

    public Product(Integer pid, String name, Integer price, Integer quantity) {
        this.pid = pid;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public Integer getPid() {
        return pid;
    }

    public String getName() {
        return name;
    }

    public Integer getPrice() {
        return price;
    }

    public Integer getQuantity() {
        return quantity;
    }
}
