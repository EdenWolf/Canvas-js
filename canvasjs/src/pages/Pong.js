import { useEffect } from "react";

export default function Pong(props) {
  let useWindowSize = props.useWindowSize;

  const [width, height] = useWindowSize();

  let canvas;
  let ctx;

  function Ball(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = height / 50;

    this.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = "white";
      ctx.fill();
    };

    this.update = function () {
      if (this.x <= this.radius || this.x + this.radius >= width) {
        this.dx *= -1;
      }
      if (this.y <= this.radius || this.y + this.radius >= height) {
        this.dy *= -1;
      }

      this.y += this.dy;
      this.x += this.dx;

      this.draw();
    };
  }

  function Player(x, y, dy) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.width = width / 100;
    this.height = height / 8;

    this.draw = function () {
      ctx.fillStyle = "white";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.update = function () {
      // if (this.x <= this.radius || this.x >= width - this.radius) {
      //   this.dx *= -1;
      // }
      // if (this.y + this.radius + this.dy >= height) {
      //   this.dy = -this.dy * 0.9;
      //   this.dx *= 0.9;
      // } else {
      //   this.dy++;
      // }
      // this.y += this.dy;
      // this.x += this.dx;

      this.draw();
    };
  }

  let ball = new Ball(width / 2, height / 2, 1, 1, 10);
  let player1 = new Player(50, height / 2, 0);
  let player2 = new Player(width - 50, height / 2, 0);

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#00171a";
    ctx.fillRect(0, 0, width, height);

    ball.update();
    player1.update();
    player2.update();
  }

  useEffect(() => {
    if (!canvas) {
      canvas = document.querySelector("canvas");
      ctx = canvas.getContext("2d");
    }
    canvas.width = width;
    canvas.height = height;

    animate();
  }, [width, height]);

  return (
    <div>
      <canvas className="pongCanvas"></canvas>
    </div>
  );
}
