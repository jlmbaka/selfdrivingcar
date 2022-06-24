const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
// draw car
const car = new Car(100, 100, 30, 50);
// draw road
const margin = 0.9;
const road = new Road(canvas.width / 2, canvas.width * margin);

// animate
animate();

function animate() {
  car.update();
  canvas.height = window.innerHeight;

  road.draw(ctx);
  car.draw(ctx);

  requestAnimationFrame(animate);
}
