import { useEffect, useState, useLayoutEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default function Circles() {
  const [width, height] = useWindowSize();
  const maxRadius = 40;
  const minRadius = 2;

  let canvas;
  let ctx;

  let mouse = {
    x: undefined,
    y: undefined
  }

  let circleArray = [];
  let colorArray = ['#006d77', '#83c5be', '#edf6f9', '#ffddd2', '#e29578'];

  function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    this.update = function () {
      this.x += this.dx;
      this.y += this.dy;

      if (this.x <= this.radius || this.x >= width - this.radius) {
        this.dx *= -1;
      }
      if (this.y <= this.radius || this.y >= height - this.radius) {
        this.dy *= -1;
      }

      if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        if (this.radius < maxRadius) {
          this.radius += 2;
        }
      }
      else if (this.radius > this.minRadius) {
        this.radius -= 2;
      }

      this.draw();
    }
  }

  for (let i = 0; i < width * height / 1000; i++) {
    const speed = 3;
    let radius = Math.random() * minRadius + minRadius;
    let x = Math.random() * (width - radius * 2) + radius;
    let y = Math.random() * (height - radius * 2) + radius;
    let dx = (Math.random() - 0.5);
    let dy = (dx >= 0 ? 0.5 - dx : -0.5 - dx) * speed;
    dx *= speed;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#00171a";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
  }

  useEffect(() => {
    if (!canvas) {
      canvas = document.querySelector("canvas");
      ctx = canvas.getContext('2d');
    }
    canvas.width = width;
    canvas.height = height;

    animate();
    return () => {
      circleArray = [];
    }
  }, [width, height]);

  const mouseMove = event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }

  return (
    <div onMouseMove={event => mouseMove(event)}>
      <canvas className="circlesCanvas"></canvas>
    </div>
  );
}