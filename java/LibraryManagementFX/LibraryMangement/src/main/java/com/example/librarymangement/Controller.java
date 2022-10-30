package com.example.librarymangement;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.input.MouseEvent;

import java.net.URL;
import java.sql.*;
import java.util.ResourceBundle;

public class Controller implements Initializable {
    //for db
    private static final String DB_URL = "jdbc:mysql://localhost:3306/library";
    private static final String USER = "root";
    private static final String PASS = "Saqlaen@123";

    @FXML
    private TextField tfId;
    @FXML
    private TextField tfTitle;
    @FXML
    private TextField tfAuthor;
    @FXML
    private TextField tfYear;
    @FXML
    private TextField tfPages;

    @FXML
    private TableView<Books> tvbooks;

    @FXML
    private TableColumn<Books, Integer > colId;
    @FXML
    private TableColumn<Books, String > colTitle;
    @FXML
    private TableColumn<Books, String > colAuthor;
    @FXML
    private TableColumn<Books, Integer > colYear;
    @FXML
    private TableColumn<Books, Integer > colPages;

    @FXML
    private Button btnInsert;
    @FXML
    private Button btnUpdate;
    @FXML
    private Button btnDelete;

    @FXML
    private void actionHandler(ActionEvent event){
        if(event.getSource() == btnInsert){
            insertRecord();
        }
        else if(event.getSource() == btnUpdate){
            updateRecord();
        }
        else if(event.getSource() == btnDelete){
            deleteRecord();
        }
    }

    @FXML
    private void handleMouseAction(MouseEvent event){
        Books obj = tvbooks.getSelectionModel().getSelectedItem();
            tfId.setText(""+obj.getId() );
            tfTitle.setText(""+obj.getTitle() );
            tfAuthor.setText(""+obj.getAuthor() );
            tfYear.setText(""+obj.getYear() );
            tfPages.setText(""+obj.getPages() );
    }

    //trying to connect to sql
    public Connection getConnection(){
        Connection conn;
        try{
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            return conn;
        }
        catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public ObservableList<Books> getBookList(){

        ObservableList<Books> bookList = FXCollections.observableArrayList();
        Connection conn  = getConnection();
        String query = "SELECT * FROM books";

        Statement st;
        ResultSet rs;
        try{
            st = conn.createStatement();
            rs = st.executeQuery(query);
            Books booksObj;
            while(rs.next()){
                booksObj = new Books(rs.getInt("id"),
                                     rs.getString("title"),
                                     rs.getString("author"),
                                     rs.getInt("year"),
                                     rs.getInt("pages") );
                bookList.add(booksObj);
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return bookList;
    }

    private void executeQuery(String query) {
        Connection conn = getConnection();
        Statement st;
        try{
            st  = conn.createStatement();
            st.executeUpdate(query);
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    public void displayBooks(){

        ObservableList<Books> booksList = getBookList();
        //column
        colId.setCellValueFactory(new PropertyValueFactory<Books, Integer>("id"));
        colTitle.setCellValueFactory(new PropertyValueFactory<Books, String>("title"));
        colAuthor.setCellValueFactory(new PropertyValueFactory<Books, String>("author"));
        colYear.setCellValueFactory(new PropertyValueFactory<Books, Integer>("year"));
        colPages.setCellValueFactory(new PropertyValueFactory<Books, Integer>("pages"));

        tvbooks.setItems(booksList);
    }

    private void insertRecord(){

        String query = "INSERT INTO books VALUES ( "+ tfId.getText() +" ,'"+
                                                     tfTitle.getText() +"','"+
                                                     tfAuthor.getText()+"',"+
                                                     tfYear.getText()+" , "+
                                                     tfPages.getText()+" );";

        executeQuery(query);
        displayBooks();
    }

    private void updateRecord(){
        String query = "UPDATE books SET title = '"+tfTitle.getText()+
                        "', author = '"+tfAuthor.getText()+
                        "', year="+tfYear.getText()+
                        ", pages="+tfPages.getText()+" WHERE id="+tfId.getText()+" ";
        executeQuery(query);
        displayBooks();
    }
    private void deleteRecord(){
        String query = "DELETE FROM books WHERE id="+tfId.getText()+";";
        executeQuery(query);
        displayBooks();
    }


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        displayBooks();
    }

}