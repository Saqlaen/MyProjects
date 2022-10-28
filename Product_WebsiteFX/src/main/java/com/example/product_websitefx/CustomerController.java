package com.example.product_websitefx;

import javafx.application.Platform;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.input.MouseEvent;

import java.net.ConnectException;
import java.net.URL;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ResourceBundle;
import java.util.Timer;
import java.util.TimerTask;

public class CustomerController implements Initializable {
    DatabaseConnection dbcon = new DatabaseConnection();

    @FXML
    private TextField tfSearch;
    @FXML
    private TextField tfName;
    @FXML
    private TextField tfPrice;
    @FXML
    private TextField tfQuantity;
    @FXML
    private Label labelMessage;

    @FXML
    private Button searchBtn;
    @FXML
    private Button buyBtn;

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
    private void MouseAction(MouseEvent event){
        Product obj = tvProduct.getSelectionModel().getSelectedItem();
        tfName.setText(""+obj.getName() );
        tfPrice.setText(""+obj.getPrice());
        tfQuantity.setText(""+obj.getQuantity());
    }

    @FXML
    private void ActionHandler(ActionEvent event){
        if(event.getSource() == buyBtn ){
            updateRecord();
            tfName.setText("");
            tfPrice.setText("");
            tfQuantity.setText("");
        }
        else if(event.getSource() == searchBtn){
            displayByName();
            tfSearch.setText("");
        }
    }




    public void displayRecord(){
        ObservableList<Product> productList = dbcon.getProductList();

        colPid.setCellValueFactory(new PropertyValueFactory<Product, Integer>("pid"));
        colName.setCellValueFactory(new PropertyValueFactory<Product, String>("name"));
        colPrice.setCellValueFactory(new PropertyValueFactory<Product, Integer>("price"));
        colQuantity.setCellValueFactory(new PropertyValueFactory<Product, Integer>("quantity"));

        tvProduct.setItems(productList);
    }

    public  void displayByName(){
        String query = String.format("SELECT * FROM Products WHERE name LIKE '%%%s%%' ;",tfSearch.getText().toLowerCase());
        ObservableList<Product> list = dbcon.getProductListByName(query);
        colPid.setCellValueFactory(new PropertyValueFactory<Product, Integer>("pid"));
        colName.setCellValueFactory(new PropertyValueFactory<Product, String>("name"));
        colPrice.setCellValueFactory(new PropertyValueFactory<Product, Integer>("price"));
        colQuantity.setCellValueFactory(new PropertyValueFactory<Product, Integer>("quantity"));

        tvProduct.setItems(list);
    }

    private void updateRecord(){
        Timer timer = new Timer();
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                Platform.runLater(() -> labelMessage.setText("Select a model you wanna buy -->"));
            }
        };
        Product obj = tvProduct.getSelectionModel().getSelectedItem();
        int quantity  = ( Integer.parseInt( tfQuantity.getText() ) )+( obj.getQuantity() );

        String query = "UPDATE Products SET quantity="+quantity+" WHERE pid="+obj.getPid()+";";
        labelMessage.setText("Order Placed");
        timer.schedule(task, 3000);
        dbcon.executeQuery(query);
        displayRecord();
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
            displayRecord();
    }
}
