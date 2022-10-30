module com.example.product_websitefx {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.sql;
    requires javafx.graphics;


    opens com.example.product_websitefx to javafx.fxml;
    exports com.example.product_websitefx;
}