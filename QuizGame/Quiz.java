package QuizGame;
import java.awt.event.*;
import java.awt.*;
import javax.swing.*;

public class Quiz implements ActionListener{

	String[] questions = {
							"which company created java",
							"which year was java created?",
							"what was java originally called?",
							"who is credited with creating Java?"
						 };
	String[][] options = {
							{"Sun Microsystems","Starbucks","Cafe CoffeeDay","Microsoft"},
							{"1989","1996","1972","1492"},
							{"Apple","Latte","Oak","Koffing"},
							{"Steve Jobs","Bill Gates","James Gosling","SuperMan"}
						 };
	char[] answers = {
					 	'A',
					 	'B',
					 	'C',
					 	'C'
					 };
	
	char guess;
	char answer;
	int index;
	int correct_guess = 0;
	int total_questions = questions.length;
	int result;
	int seconds = 10;
	
	ImageIcon icn = new ImageIcon("quiz.png");
	
	JFrame frame = new JFrame("Quiz for yaa!!!");
	JTextField textfield = new JTextField();
	JTextArea textarea = new JTextArea();
	
	JButton buttonA = new JButton();
	JButton buttonB = new JButton();
	JButton buttonC = new JButton();
	JButton buttonD = new JButton();
	
	JLabel ans_labelA = new JLabel();
	JLabel ans_labelB = new JLabel();
	JLabel ans_labelC = new JLabel();
	JLabel ans_labelD = new JLabel();
	JLabel seconds_left = new JLabel();
	
	JTextField no_right = new JTextField();
	JTextField percentage = new JTextField();
	
	Timer timer = new Timer(1000, new ActionListener() {

		@Override
		public void actionPerformed(ActionEvent e) {
			seconds--;
			seconds_left.setText(String.valueOf(seconds));
			if(seconds<=0) {
			   displayAnswer();	
			}
		}
		
	});
	
	Quiz(){
		
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(550,650);
		frame.setIconImage(icn.getImage());
		frame.setLocationRelativeTo(null);
		frame.getContentPane().setBackground(new Color(50,50,50));
		frame.setLayout(null);
		frame.setResizable(false);
		
		textfield.setBounds(0,0,550,50);
		textfield.setBackground(new Color(25,25,25));
		textfield.setForeground(new Color(25,255,0));
		textfield.setFont(new Font("Ink Free",Font.BOLD,30));
		textfield.setBorder(BorderFactory.createBevelBorder(1));
		textfield.setHorizontalAlignment(JTextField.HORIZONTAL);
		textfield.setEditable(false);
		
		textarea.setBounds(0,50,650,70);
		textarea.setLineWrap(true);
		textarea.setWrapStyleWord(true);
		textarea.setBackground(new Color(25,25,25));
		textarea.setForeground(new Color(25,255,0));
		textarea.setFont(new Font("MV Boli",Font.BOLD,30));
		textarea.setBorder(BorderFactory.createBevelBorder(1));
		textarea.setEditable(false);
		textarea.setText("hwll there");
		
		buttonA.setBounds(0,120,80,80);
		buttonA.setFont(new Font("MV Boli",Font.BOLD,35));
		buttonA.setFocusable(false);
		buttonA.addActionListener(this);
		buttonA.setBackground(new Color(255,255,255));
		buttonA.setText("A");
		
		buttonB.setBounds(0,210,80,80);
		buttonB.setFont(new Font("MV Boli",Font.BOLD,35));
		buttonB.setFocusable(false);
		buttonB.addActionListener(this);
		buttonB.setBackground(new Color(255,255,255));
		buttonB.setText("B");
		
		buttonC.setBounds(0,300,80,80);
		buttonC.setFont(new Font("MV Boli",Font.BOLD,35));
		buttonC.setFocusable(false);
		buttonC.addActionListener(this);
		buttonC.setBackground(new Color(255,255,255));
		buttonC.setText("C");
		
		buttonD.setBounds(0,390,80,80);
		buttonD.setFont(new Font("MV Boli",Font.BOLD,35));
		buttonD.setFocusable(false);
		buttonD.addActionListener(this);
		buttonD.setBackground(new Color(255,255,255));
		buttonD.setText("D");
		
		ans_labelA.setBounds(105,120,500,80);
		ans_labelA.setBackground(new Color(50,50,50));
		ans_labelA.setForeground(new Color(25,255,0));
		ans_labelA.setFont(new Font("MV Boli",Font.PLAIN,35));
		ans_labelA.setText("abbbbbbbbb");
		
		ans_labelB.setBounds(105,210,500,80);
		ans_labelB.setBackground(new Color(50,50,50));
		ans_labelB.setForeground(new Color(25,255,0));
		ans_labelB.setFont(new Font("MV Boli",Font.PLAIN,35));
		
		ans_labelC.setBounds(105,300,500,80);
		ans_labelC.setBackground(new Color(50,50,50));
		ans_labelC.setForeground(new Color(25,255,0));
		ans_labelC.setFont(new Font("MV Boli",Font.PLAIN,35));
		
		ans_labelD.setBounds(105,390,500,80);
		ans_labelD.setBackground(new Color(50,50,50));
		ans_labelD.setForeground(new Color(25,255,0));
		ans_labelD.setFont(new Font("MV Boli",Font.PLAIN,35));
		
		seconds_left.setBounds(450,525,85,85);
		seconds_left.setBackground(new Color(25,25,25));
		seconds_left.setForeground(new Color(255,0,0));
		seconds_left.setFont(new Font("Ink Free",Font.BOLD,60));
		seconds_left.setBorder(BorderFactory.createBevelBorder(1));
		seconds_left.setOpaque(true);
		seconds_left.setHorizontalAlignment(JLabel.CENTER);
		seconds_left.setText(String.valueOf(seconds));
		
		no_right.setBounds(225,225,200,100);
		no_right.setBackground(new Color(25,25,25));
		no_right.setForeground(new Color(25,255,0));
		no_right.setFont(new Font("Ink Free",Font.BOLD,50));
		no_right.setBorder(BorderFactory.createBevelBorder(1));
		no_right.setHorizontalAlignment(JTextField.CENTER);
		no_right.setEditable(false);
		
		percentage.setBounds(225,325,200,100);
		percentage.setBackground(new Color(25,25,25));
		percentage.setForeground(new Color(25,255,0));
		percentage.setFont(new Font("Ink Free",Font.BOLD,50));
		percentage.setBorder(BorderFactory.createBevelBorder(1));
		percentage.setHorizontalAlignment(JTextField.CENTER);
		percentage.setEditable(false);
		

		frame.add(textfield);
		frame.add(textarea);
		frame.add(buttonA);
		frame.add(buttonB);
		frame.add(buttonC);
		frame.add(buttonD);
		frame.add(ans_labelA);
		frame.add(ans_labelB);
		frame.add(ans_labelC);
		frame.add(ans_labelD);
		frame.add(seconds_left);
		frame.setVisible(true);
		
		nextquestion();
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		
		  buttonA.setEnabled(false);
		  buttonB.setEnabled(false);
		  buttonC.setEnabled(false);
		  buttonD.setEnabled(false);
		
		  if(e.getSource()== buttonA) {
			  answer = 'A';
			  if( answer == answers[index]) {
				  correct_guess++;
			  }
		  }
		  
		  if(e.getSource() == buttonB) {
			  answer = 'B';
			  if( answer == answers[index]) {
				  correct_guess++;
			  }
		  }
		  
		  if(e.getSource() == buttonC) {
			  answer = 'C';
			  if( answer == answers[index]) {
				  correct_guess++;
			  }
		  }
		  
		  if(e.getSource() == buttonD) {
			  answer = 'D';
			  if( answer == answers[index]) {
				  correct_guess++;
			  }
		  }
		  
		  displayAnswer();
	}
	
	public void nextquestion() {
		
		if(index>=total_questions) {
			result();
		}
		else {
			textfield.setText("Question"+(index+1));
			textarea.setText(questions[index]);
			ans_labelA.setText(options[index][0]);
			ans_labelB.setText(options[index][1]);
			ans_labelC.setText(options[index][2]);
			ans_labelD.setText(options[index][3]);
			timer.start();
		}
		
	}
	public void displayAnswer() {
		
		  timer.stop();
		  buttonA.setEnabled(false);
		  buttonB.setEnabled(false);
		  buttonC.setEnabled(false);
		  buttonD.setEnabled(false);
		  
		  if(answers[index] != 'A') {
			  ans_labelA.setForeground(new Color(255,0,0));
		  }
		  if(answers[index] != 'B') {
			  ans_labelB.setForeground(new Color(255,0,0));
		  }
		  if(answers[index] != 'C') {
			  ans_labelC.setForeground(new Color(255,0,0));
		  }
		  if(answers[index] != 'D') {
			  ans_labelD.setForeground(new Color(255,0,0));
		  }
		  
		  Timer pause = new Timer(2000, new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				
				ans_labelA.setForeground(new Color(25,255,0));
				ans_labelB.setForeground(new Color(25,255,0));
				ans_labelC.setForeground(new Color(25,255,0));
				ans_labelD.setForeground(new Color(25,255,0));
				
				answer = ' ';
				seconds = 10;
				seconds_left.setText(String.valueOf(seconds));
				buttonA.setEnabled(true);
				buttonB.setEnabled(true);
				buttonC.setEnabled(true);
				buttonD.setEnabled(true);
				index++;
				nextquestion();
			}
			  
		  });
		  
		  pause.setRepeats(false);
		  pause.start();
		
	}
	public void result() {
		
		  buttonA.setEnabled(false);
		  buttonB.setEnabled(false);
		  buttonC.setEnabled(false);
		  buttonD.setEnabled(false);
		  
		  result =(int) ((correct_guess /(double)total_questions)*100) ;
		  textfield.setText("RESULT");
		  textarea.setText(" ");
		  ans_labelA.setText(" ");
		  ans_labelB.setText(" ");
		  ans_labelC.setText(" ");
		  ans_labelD.setText(" ");
		  
		  no_right.setText("( "+ correct_guess+" / "+total_questions+" )");
		  percentage.setText(result+"%");
		  
		  frame.add(no_right);
		  frame.add(percentage);
		  
		  
	}
	
}

