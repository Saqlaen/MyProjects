module com.example.librarymangement {
    requires javafx.controls;
    requires javafx.fxml;
    requires  javafx.graphics;
    requires java.sql;


    opens com.example.librarymangement to javafx.fxml;
    exports com.example.librarymangement;
}