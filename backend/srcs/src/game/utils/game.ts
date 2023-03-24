import { Ball } from "./ball";
import { Paddle } from "./paddle";
import { Scoreboard } from "./scoreboard";
import { Field } from "./field";



export class Game {

    private ball: Ball;
    private paddle1: Paddle;
    private paddle2: Paddle;
    private scoreboard: Scoreboard;
    private field: Field;

    constructor (
        ball: Ball,
        paddle1: Paddle,
        paddle2: Paddle,
        scoreboard: Scoreboard,
        field: Field
    ) {
        this.ball = ball;
        this.paddle1 = paddle1;
        this.paddle2 = paddle2;
        this.scoreboard = scoreboard;
        this.field = field;
    }

    startBallMovement() {
        const direction = Math.random() > 0.5 ? -1 : 1;
        this.ball.setVelocity({x: 0, z: direction * 20});
    }

    processBallMovement() {
        if (!this.ball.getVelocity())
            this.startBallMovement()

        if (this.ball.getStopped() == true)
            return;

        this.updateBallPosition();

        if (this.isSideCollision() == true) {
            const newBallVelocity = this.ball.getVelocity().x * -1;
            this.ball.setVelocityZ(newBallVelocity);
        }

        if (this.isPaddleCollision(this.paddle1)) {
            this.hitBallBack(this.paddle1);
        }

        if (this.isPaddleCollision(this.paddle2)) {
            this.hitBallBack(this.paddle2);
        }

        if (this.isGoalTeam1())
            return ;

        if (this.isGoalTeam2())
            return ;
    }

    updateBallPosition() {
        const ballPos = this.ball.getPosition();

        ballPos.x  += this.ball.getVelocity().x;
        ballPos.z += this.ball.getVelocity().z;

        this.ball.setPositionX(ballPos.x);
        this.ball.setPositionY(ballPos.z);
    }

    isSideCollision() {
        const ballX = this.ball.getPosition().x;
        const ballRadius = this.ball.getRadius();
        const halfFieldWidth = this.field.getWidth() / 2;

        return ballX - ballRadius < -halfFieldWidth ||
                ballX + ballRadius > halfFieldWidth;
    }

    isPaddleCollision(paddle: Paddle) {
        const ballZ = this.ball.getPosition().z;
        const ballRadius = this.ball.getRadius();
        const paddlePosZ = paddle.getPostion().z;
        const direction = this.ball.getVelocity().z > 0 ? "up" : "down";

        if (direction === "up") {
            return ballZ + ballRadius >= paddlePosZ &&
            this.isBallAlignedWithPaddle(paddle);
        } else if (direction === "down") {
            return ballZ - ballRadius <= paddlePosZ &&
            this.isBallAlignedWithPaddle(paddle);
        }
    }

    isBallAlignedWithPaddle(paddle: Paddle) {
        const halfPaddleWidth = paddle.getWidth() / 2;
        const paddlePosX = paddle.getPostion().x;
        const ballX = this.ball.getPosition().x;

        return ballX > paddlePosX - halfPaddleWidth &&
                ballX < paddlePosX + halfPaddleWidth;
    }

    hitBallBack(paddle: Paddle) {
        const ballX = this.ball.getPosition().x;
        const paddlePosX = paddle.getPostion().x;

        const newVelocityX = (ballX - paddlePosX) / 5;
        const newVelocityZ = this.ball.getVelocity().z *-1;

        this.ball.setVelocityX(newVelocityX);
        this.ball.setVelocityZ(newVelocityZ);
    }

    isGoalTeam2() {
        const ballZ = this.ball.getPosition().z;
        const fieldZ = this.field.getLength();

        if (ballZ > fieldZ + 100) {
            this.scoreboard.incrementPlayer2()
        }
    }

    isGoalTeam1() {
        const ballZ = this.ball.getPosition().z;
        const fieldZ = this.field.getLength();

        if  (ballZ < fieldZ - 100) {
            this.scoreboard.incrementPlayer1();
        }
    }
}