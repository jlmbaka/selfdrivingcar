const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

// draw road
const margin = 0.9;
const road = new Road(carCanvas.width / 2, carCanvas.width * margin);

// draw car
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");

// the traffic
const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)];

// animate
animate();

function animate() {
  for (let i = 0; i < traffic.length; i++) traffic[i].update(road.borders, []);
  car.update(road.borders, traffic);

  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();

  keepCarCentredAt(car);

  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i++) traffic[i].draw(carCtx, "red");
  car.draw(carCtx, "blue");

  carCtx.restore();

  Visualiser.drawNetwork(networkCtx, car.brain);
  requestAnimationFrame(animate);
}

function keepCarCentredAt(car, percent = 0.7) {
  carCtx.translate(0, -car.y + carCanvas.height * 0.7); // keep the car at 70%
}
