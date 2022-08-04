class Visualiser {
  static drawNetwork(ctx, network) {
    const margin = 50;
    const left = margin;
    const top = margin;
    const width = ctx.canvas.width - margin * 2;
    const height = ctx.canvas.height - margin * 2;

    Visualiser.drawLevel(ctx, network.levels[0], left, top, width, height);
  }

  static drawLevel(ctx, level, left, top, width, height) {
    const right = left + width;
    const bottom = top + height;

    const nodeRadius = 18;
    for (let i = 0; i < level.inputs.length; i++) {
      const x = lerp(
        left,
        right,
        level.inputs.length == 1 ? 0.5 : i / (level.inputs.length - 1)
      );
      ctx.beginPath();
      ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }
}
