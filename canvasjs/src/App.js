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

  var canvas;
  var ctx;

  function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.strokeStyle = "blue";
      ctx.stroke();
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

      this.draw();
    }
  }

  var circleArray = [];

  for(var i = 0; i < 100; i++) {
    const radius = 30;
    const speed = 10;
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

  return (
    <div className="App">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
