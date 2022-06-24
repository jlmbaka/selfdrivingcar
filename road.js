class Road {
  constructor(x, width, laneCount = 4) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    const infinity = 1e6;
    this.top = -infinity;
    this.bottom = infinity;
  }

  getLaneCenter(laneIndex) {
    const laneWidth = this.width / this.laneCount;
    const offset = laneIndex * laneWidth;
    return this.left + laneWidth / 2 + offset;
  }

  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    // draw lanes
    for (let i = 0; i <= this.laneCount; i++) {
      const x = lerp(this.left, this.right, i / this.laneCount);
      if (i > 0 && i < this.laneCount) {
        // draw dashes for internal lines
        const dashLength = 20;
        const dashSpace = 20;
        ctx.setLineDash([dashLength, dashSpace]);
      } else {
        // draw borders
        ctx.setLineDash([]);
      }
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }
  }
}
