package com.example.product_websitefx;
import java.sql.*;
public class DatabaseConnection {

    private static final String DB_URL = "jdbc:mysql://localhost:3306/Website";
    private static final String USER = "root";
    private static final String PASS = "Saqlaen@123";

    public Statement getStatement(){

        Statement statement = null;
        Connection connection;
        try{
            connection = DriverManager.getConnection(DB_URL, USER, PASS);
            statement = connection.createStatement();
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return statement;
    }

    public ResultSet getQueryTable(String query) throws SQLException {

        Statement statement = getStatement();
        return statement.executeQuery(query);
    }

    public static void main(String[] args) throws SQLException {

        DatabaseConnection dbConnect = new DatabaseConnection();

        String query = "SELECT * FROM Products";
        ResultSet rs = dbConnect.getQueryTable(query);
        while(rs.next()){
//            System.out.println(rs.getInt("pid")+" "+
//                               rs.getString("name")+" "+
//                               rs.getInt("price"));
        }
    }
}
