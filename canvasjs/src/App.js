import './App.css';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight-4]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

function App() {
  const canvasRef = useRef(null);
  const [width, height] = useWindowSize();
  const maxRadius = 40;
  const minRadius = 2;

  var canvas;
  var ctx;

  var mouse = {
    x: undefined,
    y: undefined
  }

  function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    this.update = function() {
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

  var circleArray = [];
  var colorArray = ['#006d77', '#83c5be', '#edf6f9', '#ffddd2', '#e29578'];

  for(var i = 0; i < width * height / 1000; i++) {
    const speed = 3;
    var radius = Math.random() * minRadius + minRadius;
    var x = Math.random() * (width - radius * 2) + radius;
    var y = Math.random() * (height - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (dx >= 0 ? 0.5 - dx : 0.5 + dx) * speed;
    dx *= speed;

    circleArray.push(new Circle(x, y, dx, dy ,radius));
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);

    for(var i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
  }

  useEffect(() => {
    canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    const render = () => {
      animate(ctx);
    }
    render();

  }, [width, height]);

  const mouseMove = event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }

  return (
    <div className="App" onMouseMove={event => mouseMove(event)}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
