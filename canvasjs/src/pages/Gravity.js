import { useEffect } from 'react';

export default function Gravity(props) {
    let useWindowSize = props.useWindowSize;

    const [width, height] = useWindowSize();
    const maxRadius = 40;
    const minRadius = 20;

    let canvas;
    let ctx;

    let ballArray = [];
    let colorArray = ['#006d77', '#83c5be', '#edf6f9', '#ffddd2', '#e29578'];

    function Ball(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dy = dy;
        this.dx = dx;
        this.radius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

        this.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        this.update = function () {
            if (this.x <= this.radius || this.x >= width - this.radius) {
                this.dx *= -1;
            }
            if (this.y + this.radius + this.dy >= height) {
                this.dy = -this.dy * 0.9;
                this.dx *= 0.9;
            }
            else {
                this.dy++;
            }
            this.y += this.dy;
            this.x += this.dx;

            this.draw();
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#00171a";
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < ballArray.length; i++) {
            if (ballArray[i].y >= height - ballArray[i].radius && ballArray[i].dy <= 5 && ballArray[i].dy >= -5) {
                ballArray.splice(i, 1);
                continue;
            }
            ballArray[i].update();
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
            ballArray = [];
        }
    }, [width, height]);

    const mouseClick = event => {
        let dx = (Math.random() - 0.5) * 20;
        let dy = (Math.random() - 1) * 20;
        let radius = Math.random() * minRadius + maxRadius - minRadius;
        ballArray.push(new Ball(event.clientX, event.clientY, dx, dy, radius));
    }

    const keyDowm = event => {
        if (event.charCode === 32) {
            for (let ind = 0; ind <= 100; ind++) {
                let radius = Math.random() * minRadius + maxRadius - minRadius;
                let x = Math.random() * (width - radius * 2) + radius;
                let y = Math.random() * (height - radius * 2) + radius;
                let dx = (Math.random() - 0.5) * 20;
                let dy = (Math.random() - 1) * 20;
                ballArray.push(new Ball(x, y, dx, dy, radius));
            }
        }

    }

    return (
        <div onClick={event => mouseClick(event)} onKeyPress={event => keyDowm(event)} tabIndex="0">
            <canvas className="gravityCanvas"></canvas>
        </div>
    );
}