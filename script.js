const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext('2d');
canvas.width = windown.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Get Mouse Position

let mouse = {
  x: null;
  y: null;
  radius: (canvas.height/80) * (canvas.width/80);
}

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
}
);

// Create Particles
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  // Method to draw individual particles
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = '#8C5523';
    ctx.fill();
  }

  // Check particle position, check mouse position, move particle, and draw particle
  update() {
    // checks if particles is still within the canvas
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }    
    if (this.y > canvas.width || this.y < 0) {
    this.directionY = -this.directionY;
  }
//check collision detection - mouse position/particle position
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }
    // move particle
    this.x += this.directionX;
    this.y += this.directionY;
    //draw particle
    this.draw();
  }
}
//create particle array
function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = (Math.random() * 5) + 1;
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
    let directionX = (Math.random() * 5) - 2.5;
    let directionY = (Math.random() * 5) - 2.5;
    let color = '#8C5523';

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

// animate the loop
function animate() {
  requestAnimationFrame(aniamte);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
}
init();
animate();
                        


