package com.example.product_websitefx;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.*;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.io.IOException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.PrimitiveIterator;

public class LoginPageController {
    @FXML
    private TextField tfUserName;
    @FXML
    private PasswordField tfPasscode;
    @FXML
    private Button clearBtn;
    @FXML
    private Button loginBtn;

    private Stage stage;
    private Scene scene;
    boolean flag;
    Alert alert = new Alert(Alert.AlertType.NONE);

    public void ActionHandler(ActionEvent event) throws SQLException, IOException {
        if(event.getSource() == clearBtn ){
            tfUserName.setText("");
            tfPasscode.setText("");
        }
        else if(event.getSource() == loginBtn ){
            //check for login
            if( checkUserIsValid( tfUserName.getText(), tfPasscode.getText()) ){
                //check for admin
                if( checkAdmin(tfUserName.getText()) )
                {
                    flag = true;
                    FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("Admin.fxml"));
                    stage = (Stage) ( (Node)event.getSource() ).getScene().getWindow();
                    Parent root = fxmlLoader.load();
                    scene = new Scene(root);
                    stage.setTitle("admin Page");
                    stage.setScene(scene);
                    stage.show();

                }
                else {
                    flag = false;
                    FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("Customer.fxml"));
                    stage = (Stage) ( (Node)event.getSource() ).getScene().getWindow();
                    Parent root = fxmlLoader.load();
                    scene = new Scene(root);
                    stage.setTitle("Customer Page");
                    stage.setScene(scene);
                    stage.show();
                }
            }
            else {
                alert.setAlertType(Alert.AlertType.INFORMATION);
                alert.setContentText("wrong username or passcode try again!!!!!");
                alert.show();
            }


        }
    }

    private static boolean checkUserIsValid(String user, String pass) throws SQLException {
        DatabaseConnection dbObj = new DatabaseConnection();
        String EncryptPass = getEncryptedPass(pass);
        String query = String.format("SELECT * FROM users WHERE email='%s' AND passcode = '%s'", user, EncryptPass);
        ResultSet rs = dbObj.getResultSet(query);
        if(rs.next()){
            return true;
        }
        else{
            return false;
        }
    }

    private static Boolean checkAdmin(String user) throws SQLException {

        DatabaseConnection dbObj = new DatabaseConnection();
        String query = String.format("SELECT * FROM users WHERE email='%s'", user);
        ResultSet rs = dbObj.getResultSet(query);
        if(rs.next()){
            return rs.getBoolean("isAdmin");
        }
        return false;
    }

    //encrypting the passcode
    public static byte[] getSHA(String input) throws NoSuchAlgorithmException {

        MessageDigest md = MessageDigest.getInstance("SHA-256");
        return md.digest( input.getBytes(StandardCharsets.UTF_8));
    }

    public static String getEncryptedPass(String passcodeTxt){

        try {
            BigInteger no = new BigInteger(1, getSHA(passcodeTxt));
            StringBuilder hexString = new StringBuilder(no.toString(16));
            return hexString.toString();
        }
        catch (Exception e){
            e.printStackTrace();
            return "";
        }
    }


}