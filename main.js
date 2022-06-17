const canvas = document.getElementById("myCanvas");
canvas.width = 200;

// draw car
const ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);

// animate
animate();

function animate() {
    car.update();
    canvas.height = window.innerHeight;
    car.draw(ctx);
    requestAnimationFrame(animate);
}
