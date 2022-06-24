const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
// draw road
const margin = 0.9;
const road = new Road(canvas.width / 2, canvas.width * margin);
// draw car
const car = new Car(road.getLaneCenter(2), 100, 30, 50);

// animate
animate();

function animate() {
  car.update();
  canvas.height = window.innerHeight;

  road.draw(ctx);
  car.draw(ctx);

  requestAnimationFrame(animate);
}
