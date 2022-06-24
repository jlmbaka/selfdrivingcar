class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;
    this.damaged = false;

    this.sensor = new Sensor(this);
    this.controls = new Controls();
  }

  update(roadBorders) {
    if (!this.damaged) {
      this.#move();
      this.polygon = this.#createPolygon();
      this.damaged = this.#assessDamage(roadBorders);
    }
    this.sensor.update(roadBorders);
  }

  #assessDamage(roadBorders) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polysIntersect(this.polygon, roadBorders[i])) {
        return true;
      }
    }
    return false;
  }

  #createPolygon() {
    const points = [];
    const radius = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);

    for (let j = 0; j <= 1; j++) {
      for (let i = -1; i <= 1; i += 2) {
        points.push({
          x: this.x - Math.sin(Math.PI * j + this.angle + i * alpha) * radius,
          y: this.y - Math.cos(Math.PI * j + this.angle + i * alpha) * radius,
        });
      }
    }

    return points;
  }

  #move() {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }

    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }

    if (this.speed < 0) {
      this.speed += this.friction;
    }

    if (this.speed != 0) {
      const flipControls = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle += 0.03 * flipControls;
      }

      if (this.controls.right) {
        this.angle -= 0.03 * flipControls;
      }
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.damaged ? "gray" : "black";
    for (let i = 0; i < this.polygon.length; i++) {
      const args = [this.polygon[i].x, this.polygon[i].y];
      if (i == 0) ctx.moveTo(...args);
      ctx.lineTo(...args);
    }
    ctx.fill();
    this.sensor.draw(ctx);
  }
}
