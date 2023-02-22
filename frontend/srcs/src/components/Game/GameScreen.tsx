import React, {
  FC,
  useEffect,
  useRef,
  useState,
  KeyboardEventHandler,
} from "react";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:3000/game", { transports: ['websocket'] });

const GameScreen: FC = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pos, setPos] = useState({
    posX: 10,
    posY: 40,
  }); // Make a type

  const drawLeftPaddle = (rect: CanvasRenderingContext2D) => {
    rect.fillStyle = "red";
    rect.fillRect(pos.posX, pos.posY, 10, 70);
  };

  const drawRightPaddle = (rect: CanvasRenderingContext2D) => {
    rect.fillStyle = "red";
    rect.fillRect(290, 40, 10, 70);
  };

  const drawBall = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(400, 400, 10, 0, 2 * Math.PI);
    ctx.fill();
  };

  const handleInput = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      setPos({ posX: pos.posX, posY: pos.posY + 3 });
      socket.emit("sendUp")
    } else if (event.key == "ArrowUp") {
      setPos({ posX: pos.posX, posY: pos.posY - 3 });
      socket.emit("sendDown");
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Error canvas");
      return;
    }
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const context = canvas.getContext("2d");
    if (!context) {
      console.error("Context of the canva is null");
      return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    drawLeftPaddle(context);
    drawRightPaddle(context);
    drawBall(context);
  });

  return (
    <canvas
      tabIndex={0}
      onKeyDown={handleInput}
      className="w-full h-screen"
      ref={canvasRef}
      {...props}
    />
  );
};

export default GameScreen;
