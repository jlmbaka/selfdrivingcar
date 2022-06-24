class Sensor {
  constructor(car) {
    this.car = car;
    this.rayCount = 1;
    this.rayLength = 150;
    this.raySpread = Math.PI / 2;

    this.rays = [];
  }

  update() {
    this.rays = [];

    // Figure out the angle of each ray
    for (let i = 0; i < this.rayCount; i++) {
      let rayAngle = lerp(
        this.raySpread / 2,
        -this.raySpread / 2,
        this.rayCount == 1 ? 0.5 : i / Math.max(0.5, this.rayCount - 1)
      );

      // Rotate rays with car angle
      rayAngle += this.car.angle;

      // Start and end point of our ray
      const rayStartPoint = { x: this.car.x, y: this.car.y }; // just the car
      const rayEndPoint = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength,
      };
      // Add it to the list of rays
      this.rays.push([rayStartPoint, rayEndPoint]);
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.rayCount; i++) {
      // Draw a line between the start and end points
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.stroke();
    }
  }
}
