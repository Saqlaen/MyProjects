package TicTacToe;

import java.util.Random;

import javax.swing.JButton;
import javax.swing.*;
import java.awt.event.*;
import java.awt.*;

public class TicTacToe extends JFrame implements ActionListener{
    
    Random random = new Random();
    JPanel titlePanel = new JPanel();
    JPanel buttonPanel = new JPanel();
    JLabel textField = new JLabel();
    JButton[] buttons = new JButton[9];
    boolean playerOneTurn;

    TicTacToe(){

        //jFrame
        this.setSize(500,500);
        this.setTitle("Tic-Tac-toe");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setLocationRelativeTo(null);
        this.setLayout(new BorderLayout());
        this.getContentPane().setBackground(new Color(0,0,0)); 

        //textField
        textField.setBounds(0,5,500,150);
		textField.setBackground(new Color(25,25,25));
		textField.setForeground(new Color(25,255,0));
		textField.setFont(new Font("Ink Free",Font.BOLD,55));
		textField.setHorizontalAlignment(JLabel.CENTER);
		textField.setVerticalAlignment(JLabel.BOTTOM);
		textField.setText("Tic-Tac-Toe");
		textField.setOpaque(true);

        //title Panel
        titlePanel.setLayout(new BorderLayout());
        titlePanel.setBounds(5,5,500,150);
        titlePanel.setBackground(new Color(50,50,50));
        titlePanel.setAlignmentY(JPanel.CENTER_ALIGNMENT);
        titlePanel.add(textField);

        //buttons panel 
        buttonPanel.setLayout(new GridLayout(3,3));
        buttonPanel.setBackground(new Color(150,150,150));

        //creating buttons
        for(int i=0; i<9; i++){
            buttons[i] = new JButton();
            buttonPanel.add(buttons[i]);
            buttons[i].setFont(new Font("MV Boli",Font.BOLD,120));
			buttons[i].setFocusable(false);
			buttons[i].addActionListener(this);
			buttons[i].setBackground( new Color(59,53,53) );
        }

        this.add(titlePanel, BorderLayout.NORTH);
        this.add(buttonPanel);
        this.setVisible(true);

        startGame();
    }

    void startGame(){

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        if(random.nextInt(2) == 0){
            playerOneTurn = true;
            textField.setText("X's Turn");
        }
        else{
            playerOneTurn = false;
            textField.setText("O's Turn");
        }
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        //check for which buttons are clicked
        for(int i=0; i<9; i++){
            if(e.getSource() == buttons[i]){
                if(playerOneTurn){
                    if(buttons[i].getText() == ""){
                        buttons[i].setForeground(new Color(255,0,0));
						buttons[i].setText("X");
						playerOneTurn = false;
						textField.setText("O's turn");
                        winCondition();
                    }
                    else{
                        buttons[i].setEnabled(false);
                    }
                }
                else{
                    if(buttons[i].getText() == ""){
                        buttons[i].setForeground(new Color(0,0,255));
                        buttons[i].setText("O");
                        playerOneTurn = true;
						textField.setText("X's turn");
                        winCondition();
                    }
                    else{
                        buttons[i].setEnabled(false);
                    }
                }
            }
        }
        
    }

    void winCondition(){
            //check if x wins condition
        if( buttons[0].getText()=="X" &&
            buttons[1].getText()=="X" &&
            buttons[2].getText()=="X") 
            {
                xWins(0,1,2);
            }
        else if( 	buttons[3].getText()=="X" &&
                buttons[4].getText()=="X" &&
                buttons[5].getText()=="X") 
            {
                xWins(3,4,5);
            }
        else if( 	buttons[6].getText()=="X" &&
                buttons[7].getText()=="X" &&
                buttons[8].getText()=="X") 
            {
                xWins(6,7,8);
            }
        else if( 	buttons[0].getText()=="X" &&
                buttons[3].getText()=="X" &&
                buttons[6].getText()=="X") 
            {
                xWins(0,3,6);
            }
        else if( 	buttons[1].getText()=="X" &&
                buttons[4].getText()=="X" &&
                buttons[7].getText()=="X") 
            {
                xWins(1,4,7);
            }
        else if( 	buttons[2].getText()=="X" &&
                buttons[5].getText()=="X" &&
                buttons[8].getText()=="X") 
            {
                xWins(2,5,8);
            }
        else if( 	buttons[0].getText()=="X" &&
                buttons[4].getText()=="X" &&
                buttons[8].getText()=="X") 
            {
                xWins(0,4,8);
            }
        else if( 	buttons[2].getText()=="X" &&
                buttons[4].getText()=="X" &&
                buttons[6].getText()=="X") 
            {
                xWins(2,4,6);
            }
        else {
            nobodyWins();
        }
        
        //check if y wins condition
        
        if(     buttons[0].getText()=="O" &&
                buttons[1].getText()=="O" &&
                buttons[2].getText()=="O") 
                {
                    oWins(0,1,2);
                }
        else if( 	    buttons[3].getText()=="O" &&
                    buttons[4].getText()=="O" &&
                    buttons[5].getText()=="O") 
                {
                    oWins(3,4,5);
                }
        else if( 	    buttons[6].getText()=="O" &&
                    buttons[7].getText()=="O" &&
                    buttons[8].getText()=="O") 
                {
                    oWins(6,7,8);
                }
        else if( 	    buttons[0].getText()=="O" &&
                    buttons[3].getText()=="O" &&
                    buttons[6].getText()=="O") 
                {
                    oWins(0,3,6);
                }
        else if( 	    buttons[1].getText()=="O" &&
                    buttons[4].getText()=="O" &&
                    buttons[7].getText()=="O") 
                {
                    oWins(1,4,7);
                }
        else if( 	    buttons[2].getText()=="O" &&
                    buttons[5].getText()=="O" &&
                    buttons[8].getText()=="O") 
                {
                    oWins(2,5,8);
                }
        else if( 	    buttons[0].getText()=="O" &&
                    buttons[4].getText()=="O" &&
                    buttons[8].getText()=="O") 
                {
                    oWins(0,4,8);
                }
        else if( 	    buttons[2].getText()=="O" &&
                    buttons[4].getText()=="O" &&
                    buttons[6].getText()=="O") 
                {
                    oWins(2,4,6);
                }
        else {
            nobodyWins();
        }
    }

    void xWins(int a, int b, int c){

        buttons[a].setBackground(Color.green);
		buttons[b].setBackground(Color.green);
		buttons[c].setBackground(Color.green);
		
		for(int i=0; i<9; i++) {
			buttons[i].setEnabled(false);
		}
		textField.setText("X wins");

    }

    void oWins(int a, int b, int c){

        buttons[a].setBackground(Color.green);
		buttons[b].setBackground(Color.green);
		buttons[c].setBackground(Color.green);
		
		for(int i=0; i<9; i++) {
			buttons[i].setEnabled(false);
		}
		textField.setText("O wins");
    }

    void nobodyWins(){
        boolean flag = true;
        for( int i=0; i<9; i++ ){
            if(buttons[i].getText() == ""){
                flag = false;
            }
        }
        if(flag){
            textField.setText("TRY AGAIN!!!!!!!");
        }
    }

}
