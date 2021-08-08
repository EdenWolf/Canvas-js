import { useEffect } from "react";

export default function Pong(props) {
  let useWindowSize = props.useWindowSize;
  let randomIntFromRange = props.randomIntFromRange;
  let getDistance = props.getDistance;

  const [width, height] = useWindowSize();

  let canvas;
  let ctx;

  function Ball(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.dy = dy * this.speed;
    this.dx = dx * this.speed;
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

      // Left Player
      let inLeftPlayerXRange =
        playerL.x + playerL.width + this.radius >= this.x;
      let inLeftPlayerYRange =
        playerL.y <= this.y && playerL.y + playerL.height >= this.y;
      let closeToLeftPlayerCorner =
        getDistance(this.x, this.y, playerL.x + playerL.width, playerL.y) <=
          this.radius &&
        getDistance(
          this.x,
          this.y,
          playerL.x + playerL.width,
          playerL.y + playerL.height
        ) <= this.radius;
      let collidedLeftPlayer =
        closeToLeftPlayerCorner || (inLeftPlayerXRange && inLeftPlayerYRange);

      // Right Player
      let inRightPlayerXRange = playerR.x - this.radius <= this.x;
      let inRightPlayerYRange =
        playerR.y <= this.y && playerR.y + playerR.height >= this.y;
      let closeToRightPlayerCorner =
        getDistance(this.x, this.y, playerR.x, playerR.y) <= this.radius &&
        getDistance(this.x, this.y, playerR.x, playerR.y + playerR.height) <=
          this.radius;
      let collidedRightPlayer =
        closeToRightPlayerCorner ||
        (inRightPlayerXRange && inRightPlayerYRange);

      if (collidedLeftPlayer || collidedRightPlayer) {
        this.dx *= -1;
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
      this.draw();
    };
  }

  let ball = new Ball(width / 2, height / 2, 1, 1, 10);
  let playerL = new Player(50, height / 2, 0);
  let playerR = new Player(width - 50, height / 2, 0);

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#00171a";
    ctx.fillRect(0, 0, width, height);

    playerL.update();
    playerR.update();
    ball.update();
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
