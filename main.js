const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");

// draw road
const margin = 0.9;
const road = new Road(canvas.width / 2, canvas.width * margin);

// draw car
const car = new Car(road.getLaneCenter(1), 100, 30, 50);

// the traffic
const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50)];
// animate
animate();

function animate() {
  for (let i = 0; i < traffic.length; i++) traffic[i].update(road.borders);
  car.update(road.borders);
  canvas.height = window.innerHeight;

  ctx.save();

  keepCarCentredAt(car);

  road.draw(ctx);
  for (let i = 0; i < traffic.length; i++) traffic[i].draw(ctx);
  car.draw(ctx);

  ctx.restore();

  requestAnimationFrame(animate);
}

function keepCarCentredAt(car, percent = 0.7) {
  ctx.translate(0, -car.y + canvas.height * 0.7); // keep the car at 70%
}
