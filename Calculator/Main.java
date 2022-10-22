package Calculator;
import javax.swing.*;
import javax.swing.border.Border;
import javax.swing.border.EtchedBorder;

import java.awt.*;
import java.awt.event.*;
public class Main implements ActionListener{
	
	JFrame frame;
	JTextField textfield;
	JButton[] numberButton = new JButton[10];
	JButton[] functionButton = new JButton[8];
	JButton addButton, subButton, mulButton,divButton;
	JButton decButton,equButton, delButton, clrButton;
	JPanel panel;
	
	Font myfont = new Font("Mono_space",Font.BOLD,30);
	
	double num1 = 0,num2 = 0,result =0;
	char operator;
	
	Main(){
		
		frame = new JFrame("Calculator");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(420,550);
		frame.setLocationRelativeTo(null);
		frame.setLayout(null);
		
		textfield = new JTextField();
		textfield.setBounds(25,25,350,100);
		textfield.setFont(myfont);
		textfield.setEditable(false);
		textfield.setBorder(BorderFactory.createEtchedBorder(EtchedBorder.RAISED, Color.gray, null));
		textfield.setBackground(Color.LIGHT_GRAY);
		
		addButton = new JButton("+");
		subButton = new JButton("-");
		mulButton = new JButton("*");
		divButton = new JButton("/");
		decButton = new JButton(".");
		equButton = new JButton("=");
		delButton = new JButton("Delete");
		clrButton = new JButton("Wipe");
		
		functionButton[0] = addButton;
		functionButton[1] = subButton;
		functionButton[2] = mulButton;
		functionButton[3] = divButton;
		functionButton[4] = decButton;
		functionButton[5] = equButton;
		functionButton[6] = delButton;
		functionButton[7] = clrButton;
		
		
		
		for(int i=0; i<8; i++) {
			functionButton[i].addActionListener(this);
			functionButton[i].setFont(myfont);
			functionButton[i].setFocusable(false);
			functionButton[i].setVerticalTextPosition(JButton.CENTER);
			functionButton[i].setHorizontalTextPosition(JButton.CENTER);
			
		}
		
		for(int i=0; i<10; i++) {
			numberButton[i] = new JButton(String.valueOf(i));
			numberButton[i].addActionListener(this);
			numberButton[i].setFont(myfont);
			numberButton[i].setFocusable(false);
		}
		
		delButton.setBounds(50,450,145,50);
		clrButton.setBounds(205,450,145,50);
		
		panel = new JPanel();
		panel.setBounds(50,135,300,300);
		panel.setLayout(new GridLayout(4,4,10,10));
//		panel.setBackground(Color.DARK_GRAY);
		
		panel.add(numberButton[7]);
		panel.add(numberButton[8]);
		panel.add(numberButton[9]);
		panel.add(mulButton);
		panel.add(numberButton[4]);
		panel.add(numberButton[5]);
		panel.add(numberButton[6]);
		panel.add(subButton);
		panel.add(numberButton[1]);
		panel.add(numberButton[2]);
		panel.add(numberButton[3]);
		panel.add(addButton);
		panel.add(decButton);
		panel.add(numberButton[0]);
		panel.add(equButton);
		panel.add(divButton);
		
		frame.add(textfield);
		frame.add(panel);
		frame.add(delButton);
		frame.add(clrButton);

		frame.setVisible(true);
	}
	
	public static void main(String[] args) {
	
		Main oj = new Main();

	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
		//press on no button to show in textfield
		for(int i=0; i<10; i++ ) {
			if(e.getSource()==numberButton[i]) {
				textfield.setText( textfield.getText().concat(String.valueOf(i)) );
			}
		}
		
		if(e.getSource()== decButton) {
			textfield.setText( textfield.getText().concat(".") );
		}
		
		if(e.getSource()== addButton) {
			num1 = Double.parseDouble(textfield.getText());
			operator = '+';
			textfield.setText("");
		}
		if(e.getSource()== subButton) {
			num1 = Double.parseDouble( textfield.getText() );
			operator = '-';
			textfield.setText("");
		}
		if(e.getSource()== mulButton) {
			num1 = Double.parseDouble( textfield.getText() );
			operator = '*';
			textfield.setText("");
		}
		if(e.getSource()== divButton) {
			num1 = Double.parseDouble( textfield.getText() );
			operator = '/';
			textfield.setText("");
		}
		if(e.getSource()== equButton) {
			num2 = Double.parseDouble( textfield.getText() );
			switch(operator) {
				case'+': result = num1+num2;
				break;
				case'-': result = num1-num2;
				break;
				case'*': result = num1*num2;
				break;
				case'/': result = num1/num2;
				break;
			}
			textfield.setText(String.valueOf(result));
			num1 = result;
		}
		
		if(e.getSource()== clrButton) {
			textfield.setText("");
		}
		
		if(e.getSource()== delButton) {
			String str = textfield.getText();
			textfield.setText("");
			for(int i=0; i<str.length()-1; i++) {
				textfield.setText(textfield.getText()+str.charAt(i));
			}
		}
		
		
	}

}
