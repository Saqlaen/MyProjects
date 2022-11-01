import java.awt.event.*;
import java.awt.*;
import javax.swing.*;
import java.util.Random;

public class GamePanel extends JPanel implements ActionListener{

	static final int SCREEN_WIDTH = 600;
	static final int SCREEN_HEIGHT = 600;
	static final int UNIT_SIZE = 25;
	static final int GAME_UNITS = (SCREEN_WIDTH * SCREEN_HEIGHT)/UNIT_SIZE;
	static final int DELAY  = 75;
	final int x[] = new int[GAME_UNITS];
	final int y[] = new int[GAME_UNITS];
	int bodyParts = 6;
	int applesEaten;
	int appleX; //x cordinates of apple
	int appleY; //y cordinates of apple
	char direction = 'D';
	boolean running = false;
	Timer timer;
	Random random;
	
	GamePanel(){
		
		random = new Random();
		this.setPreferredSize(new Dimension(SCREEN_WIDTH,SCREEN_HEIGHT));
		this.setBackground(Color.black);
		this.setFocusable(true);
		this.addKeyListener(new MyKeyAdapter());
		startGame();
	}
	
	public void startGame() {
		
		newApple();
		running = true;
		timer = new Timer(DELAY,this);
		timer.start();
	}
	
	public void paintComponent(Graphics g) {
		
		super.paintComponent(g);
		draw(g);
	}
	
	public void draw(Graphics g) {
		
		if(running) {
			
			for(int i=0; i< SCREEN_HEIGHT/UNIT_SIZE; i++) {
				g.drawLine(i*UNIT_SIZE, 0, i*UNIT_SIZE, SCREEN_HEIGHT);
				g.drawLine(0, i*UNIT_SIZE, SCREEN_WIDTH, i*UNIT_SIZE);
			}
			//apple color
			g.setColor(Color.RED);
			g.fillOval(appleX, appleY, UNIT_SIZE, UNIT_SIZE);
			//coloring the snake
			for(int i=0; i<bodyParts; i++) {
				if(i == 0) {
					g.setColor(Color.red);
					g.fillRect(x[i] , y[i], UNIT_SIZE, UNIT_SIZE);
				}
				else {
					g.setColor(new Color(random.nextInt(255),random.nextInt(255),random.nextInt(255)));
					g.fillRect(x[i] , y[i], UNIT_SIZE, UNIT_SIZE);
				}
			}
			//to display the running score
			g.setColor(Color.red);
			g.setFont(new Font("Ink Free",Font.BOLD,40));
			//useful for lining up text in the middle of the screen
			FontMetrics metrics = getFontMetrics(g.getFont());
			g.drawString("Score: "+applesEaten, ( SCREEN_WIDTH - metrics.stringWidth("Score: "+applesEaten) )/2, g.getFont().getSize() );
		}
		else {
			gameOver(g);
		}
		
	}
	
	public void newApple() {
		
		appleX = random.nextInt( ( SCREEN_WIDTH/UNIT_SIZE ) ) * UNIT_SIZE;
		appleY = random.nextInt((SCREEN_HEIGHT/UNIT_SIZE) ) * UNIT_SIZE;
	}
	
	public void move() {
		
		//move the body parts with head
		for( int i= bodyParts; i>0; i--) {
			x[i] = x[i-1];
			y[i] = y[i-1];
		}
		
		//move the snake according to direction
		switch(direction) {
		 case 'U':
			 y[0] = y[0] - UNIT_SIZE;
			 break;
		 case 'D':
			 y[0] = y[0] + UNIT_SIZE;
			 break;
		 case 'R':
			 x[0] = x[0] + UNIT_SIZE;
			 break;
		 case 'L':
			 x[0] = x[0] - UNIT_SIZE;
			 break;
		}
		
		
	}
	
	public void checkApple() {
		
		if( (x[0] == appleX) && (y[0] == appleY) ) {
			bodyParts++;
			applesEaten++;
			newApple();
		}
	}
	
	public void checkCollision() {
		
		//checks if head collids with body
		for(int i=bodyParts; i>0; i--) {
			if( ( x[0] == x[i] ) && (y[0] == y[i]) ) {
				running = false;
			}
		}
		//checks if head touches left border
		if(x[0] < 0) {
			running = false;
		}
		//checks if head touches right border
		if(x[0] > SCREEN_WIDTH) {
			running = false;
		}
		//checks if head touches top border
		if(y[0] < 0 ) {
			running = false;
		}
		//checks if head touches bottom border
		if(y[0] > SCREEN_HEIGHT ) {
			running = false;
		}
		
		if(!running) {
			timer.stop();
		}
	}
	
	public void gameOver(Graphics g) {
		//displaying the score
		g.setColor(Color.red);
		g.setFont(new Font("Ink Free",Font.BOLD,40));
		//useful for lining up text in the middle of the screen
		FontMetrics metrics1 = getFontMetrics(g.getFont());
		g.drawString("Score: "+applesEaten, ( SCREEN_WIDTH - metrics1.stringWidth("Score: "+applesEaten) )/2, g.getFont().getSize() );
		g.setColor(Color.red);
		g.setFont(new Font("Ink Free",Font.BOLD,75));
		//useful for lineing up text in the middle of the screen
		FontMetrics metrics2 = getFontMetrics(g.getFont());
		g.drawString("Game Over", ( SCREEN_WIDTH - metrics2.stringWidth("Game Over") )/2, SCREEN_HEIGHT/2);
		
	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
		
		if(running) {
			move();
			checkApple();
			checkCollision();
		}
		
		repaint();	
	}
	
	//inner class
	public class MyKeyAdapter extends KeyAdapter {
		
		@Override
		public void keyPressed(KeyEvent e) {
			
			switch(e.getKeyCode()) {
				case KeyEvent.VK_RIGHT:
					if(direction != 'L') {
						direction = 'R';
					}
					break;
				case KeyEvent.VK_UP:
					if(direction != 'D') {
						direction = 'U';
					}
					break;
				case KeyEvent.VK_DOWN:
					if(direction != 'U') {
						direction = 'D';
					}
					break;
				case KeyEvent.VK_LEFT:
					if(direction != 'R') {
						direction = 'L';
					}
					break;
			}
		}
	}

}
