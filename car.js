class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.accelegaration = 0.2;
    this.controls = new Controls();
  }

  update() {
    if (this.controls.forward) {
      this.speed += this.accelegaration;
    }
    if (this.controls.reverse) {
      this.speed -= this.accelegaration;
    }
    this.y -= this.speed;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    ctx.fill();
  }
}
