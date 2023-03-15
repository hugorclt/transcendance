import { Paddle } from "./paddle";
import { Ball } from "./ball";
import { Pitch } from "./pitch";

function detectCollisionsPaddle(ball: Ball, paddle: Paddle): boolean {
    // Calculate the distance between the center of the ball and the center of the paddle
    const distanceX = Math.abs(ball.getX() - paddle.getX());
    const distanceY = Math.abs(ball.getY() - paddle.getY());
    
    // Check if the distance is less than or equal to the sum of the ball radius and half the paddle width/height
    if (distanceX > (paddle.getWidth() / 2 + ball.getRadius())) { 
      return false;
    }
    if (distanceY > (paddle.getHeight() / 2 + ball.getRadius())) {
      return false;
    }
    
    // If the distance is less than or equal to the sum of the ball radius and half the paddle width/height, there is a collision
    return true;
  }
  
  