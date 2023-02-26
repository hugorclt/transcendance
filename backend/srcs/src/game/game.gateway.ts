import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';

type Player = {
    posX : number
    posY : number
    width : number
    height : number
}

type Ball = {
    posX : number
    posY : number
    dirX : number
    dirY : number
    velocity : number
    radius : number
}

@WebSocketGateway({
    namespace: '/game',
    cors: true,
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss: Server;

    initBall() {
        var ball: Ball = { 
            posX: 10,
            posY: 0,
            dirX: 0,
            dirY: 0,
            velocity: 0.01,
            radius: 2,
        }
        return ball
    }

    initPlayer(x: number, y: number) {
        var player: Player = { 
            posX: x,
            posY: y,
            width: 2,
            height: 5,
        }
        return player;
    }

    newBallPos(x, y, dx, dy, accel, dt, radius) {
        var x2  = x + (dt * dx) + (accel * dt * dt * 0.5);
        var y2  = y + (dt * dy) + (accel * dt * dt * 0.5);
        var dx2 = dx + (accel * dt) * (dx > 0 ? 1 : -1);
        var dy2 = dy + (accel * dt) * (dy > 0 ? 1 : -1);

        var newBall = {
            posX:(x2-x),
            posY:(y2-y),
            dirX:dx2,
            dirY:dy2,
            velocity: accel,
            radius: radius,
        }
        return newBall;
    }

    intercept(x1, y1, x2, y2, x3, y3, x4, y4, d) {
        var denom = ((y4-y3) * (x2-x1)) - ((x4-x3) * (y2-y1));
        if (denom != 0) {
          var ua = (((x4-x3) * (y1-y3)) - ((y4-y3) * (x1-x3))) / denom;
          if ((ua >= 0) && (ua <= 1)) {
            var ub = (((x2-x1) * (y1-y3)) - ((y2-y1) * (x1-x3))) / denom;
            if ((ub >= 0) && (ub <= 1)) {
              var x = x1 + (ua * (x2-x1));
              var y = y1 + (ua * (y2-y1));
              return { x: x, y: y, d: d};
            }
          }
        }
        return null;
    }

    ballIntercept (ball : Ball, rect : Player, nx, ny) {
        var pt;
        if (nx < 0) {
          pt = this.intercept(ball.posX, ball.posY, ball.posX + nx, ball.posY + ny, 
                                    rect.posX + (rect.width / 2)  + ball.radius, 
                                    rect.posY + (rect.height / 2)    - ball.radius, 
                                    rect.posX + (rect.width / 2)  + ball.radius, 
                                    rect.posY - (rect.height / 2) + ball.radius, 
                                    "right");
        }
        else if (nx > 0) {
          pt = this.intercept(ball.posX, ball.posY, ball.posX + nx, ball.posY + ny, 
                                    rect.posX - (rect.width / 2)   - ball.radius, 
                                    rect.posY + (rect.height / 2)    - ball.radius, 
                                    rect.posX - (rect.width / 2)  - ball.radius, 
                                    rect.posY - (rect.height / 2) + ball.radius,
                                    "left");
        }
        if (!pt) {
          if (ny < 0) {
            pt = this.intercept(ball.posX, ball.posY, ball.posX + nx, ball.posY + ny, 
                                        rect.posX - (rect.width / 2)   - ball.radius, 
                                        rect.posY - (rect.height / 2) + ball.radius, 
                                        rect.posX + (rect.width / 2)  + ball.radius, 
                                        rect.posY - (rect.height / 2) + ball.radius,
                                        "bottom");
          }
          else if (ny > 0) {
            pt = this.intercept(ball.posX, ball.posY, ball.posX + nx, ball.posY + ny, 
                                        rect.posX - (rect.width / 2)   - ball.radius, 
                                        rect.posY + (rect.height / 2)    - ball.radius, 
                                        rect.posX + (rect.width / 2)  + ball.radius, 
                                        rect.posY + (rect.height / 2)    - ball.radius,
                                        "top");
          }
        }
        return pt;
    }
      
    async launchGame() {
        var player1 : Player = this.initPlayer(10, 0)
        var player2 : Player = this.initPlayer(-10, 0)
        var ball : Ball = this.initBall();
        var scorePlayerOne = 0;
        var scorePlayerTwo = 0;
        var initialDirection = 1;
        var isBeginningRound = 1;
        var maxX = 100;
        var maxY = 30;
        var minX = -100;
        var minY = -30

        while (scorePlayerOne != 11 || scorePlayerTwo != 11)
        {
            var newBall: Ball = this.newBallPos(ball.posX, ball.posY, ball.dirX, ball.dirY, ball.velocity, 1, ball.radius)

            if ((newBall.dirY > 0) && (newBall.posY < maxY)) {
                newBall.posY = maxX;
                newBall.dirY = -newBall.dirY;
            }
            else if ((newBall.dirY < 0) && (newBall.posY < minY)) {
                newBall.posY = minY;
                newBall.dirY = -newBall.dirY;
            }

            var currentPaddle = (newBall.dirX < 0) ? player2 : player1;
            var collision = this.ballIntercept(ball, currentPaddle, newBall.posX, newBall.posY);

            if (collision) {
                switch(collision.d) {
                    case 'left':
                    case 'right':
                      newBall.posX = collision.x;
                      newBall.dirX = -newBall.dirX;
                      break;
                    case 'top':
                    case 'bottom':
                      newBall.posY = collision.y;
                      newBall.dirY = -newBall.dirY;
                      break;
                }
            }

            if (isBeginningRound == 1) {
                ball.dirX = initialDirection;
                isBeginningRound = 0;
            }
            if (ball.posX >= 11) {
                scorePlayerTwo++;
                ball = this.initBall();
                isBeginningRound = 1;
            }
            if (ball.posX <= -11) {
                scorePlayerOne++;
                ball = this.initBall();
                isBeginningRound = 1;
            }
        }
    }
    
    afterInit(server: any) {
        console.log("initialized");
    }

    async handleConnection() {
        console.log("new connection")
    }

    async handleDisconnect() {
        console.log("user disconnected")
    }

    @SubscribeMessage("sendUp") 
    handleMoveUp (client: Socket){
        console.log("Up received")
    }

    @SubscribeMessage("sendDown") 
    handleMoveDown (client: Socket){
        console.log("Down received")
    }
}