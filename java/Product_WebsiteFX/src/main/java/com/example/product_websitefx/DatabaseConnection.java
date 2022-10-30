package com.example.product_websitefx;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

import java.sql.*;

public class DatabaseConnection {

    private static final String DB_URL = "jdbc:mysql://localhost:3306/Website";
    private static final String USER = "root";
    private static final String PASS = "Saqlaen@123";

    public Connection getConnection() {
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

    public ResultSet getResultSet(String query){
        Connection conn = getConnection();
        Statement st ;
        ResultSet rs;
        try {
            st = conn.createStatement();
            rs = st.executeQuery(query);
            return rs;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }
    public void executeQuery(String Query){
        Connection conn = getConnection();
        Statement st ;
        try {
            st = conn.createStatement();
            st.executeUpdate(Query);
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    public ObservableList<Product> getProductList(){
        String query = "SELECT * FROM Products";
        return getProduct(query);
    }

    public ObservableList<Product> getProductListByName(String text){
        return getProduct(text);
    }

    public ObservableList<Product> getProduct(String query){
        ObservableList<Product> productsList = FXCollections.observableArrayList();
        Connection con = getConnection();
        Statement st;
        ResultSet rs;
        try{
            st = con.createStatement();
            rs = st.executeQuery(query);
            while(rs.next()){
                productsList.add(new Product( rs.getInt("pid"),
                        rs.getString("name"),
                        rs.getInt("price"),
                        rs.getInt("quantity") ) );
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return productsList;
    }

    public ObservableList<User> getUserList(){
        ObservableList<User> list = FXCollections.observableArrayList();
        Connection con = getConnection();
        Statement st ;
        ResultSet rs;
        String q = "SELECT * FROM users";
        try{
            st = con.createStatement();
            rs = st.executeQuery(q);
            while(rs.next()){
                list.add(new User(rs.getInt("uid"),
                                  rs.getString("email"),
                                  rs.getString("passcode")) );
            }
            return list;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
