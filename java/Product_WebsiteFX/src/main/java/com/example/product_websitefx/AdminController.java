package com.example.product_websitefx;

import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;

import java.net.URL;
import java.util.ResourceBundle;

public class AdminController implements Initializable {
    DatabaseConnection dbcon = new DatabaseConnection();

    @FXML
    private TextField removePid;
    @FXML
    private TextField adminId;

    @FXML
    private TextField addName;
    @FXML
    private TextField addPrice;

    @FXML
    private Button removeBtn;
    @FXML
    private Button removeAdmin;
    @FXML
    private Button addBtn;

    @FXML
    private TableView<Product> tvProduct;

    @FXML
    private TableColumn<Product, String> colName;
    @FXML
    private TableColumn<Product, Integer> colPid;
    @FXML
    private TableColumn<Product, Integer> colPrice;
    @FXML
    private TableColumn<Product, Integer> colQuantity;

    @FXML
    private TableView<User> tvAdmin;
    @FXML
    private TableColumn<User, Integer> colUid;
    @FXML
    private TableColumn<User, String> colEmail;
    @FXML
    private TableColumn<User, String> colPasscode;

    @FXML
    private void ActionHandler(ActionEvent event){
        if(event.getSource() == addBtn){
            addRecord();
            addName.setText("");
            addPrice.setText("");

        }
        else if(event.getSource() == removeBtn){
            deleteRecord();
            removePid.setText("");
        }
        else if(event.getSource() == removeAdmin){
            deleteUser();
            adminId.setText("");
        }
    }

    public void addRecord(){
        String query = String.format("INSERT INTO Products (name, price) VALUES ('%s',%s)",addName.getText(), addPrice.getText() );
        dbcon.executeQuery(query);
        displayRecord();
    }

    public void displayAdminTable(){
        ObservableList<User> adminList = dbcon.getUserList();

        colUid.setCellValueFactory(new PropertyValueFactory<User, Integer>("uid"));
        colEmail.setCellValueFactory(new PropertyValueFactory<User, String>("email"));
        colPasscode.setCellValueFactory(new PropertyValueFactory<User, String>("passcode"));

        tvAdmin.setItems(adminList);
    }

    public void displayRecord(){
        ObservableList<Product> productList = dbcon.getProductList();

        colPid.setCellValueFactory(new PropertyValueFactory<Product, Integer>("pid"));
        colName.setCellValueFactory(new PropertyValueFactory<Product, String>("name"));
        colPrice.setCellValueFactory(new PropertyValueFactory<Product, Integer>("price"));
        colQuantity.setCellValueFactory(new PropertyValueFactory<Product, Integer>("quantity"));

        tvProduct.setItems(productList);
    }

    public void deleteRecord(){
        String query = String.format("DELETE FROM Products WHERE pid=%s",removePid.getText() );
        dbcon.executeQuery(query);
        displayRecord();
    }

    public void deleteUser(){
        String query = String.format("DELETE FROM users WHERE uid=%s",adminId.getText() );
        dbcon.executeQuery(query);
        displayAdminTable();
    }


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        displayAdminTable();
        displayRecord();
    }
}
