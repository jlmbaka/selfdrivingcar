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
    const { inputs, outputs } = level;
    const nodeRadius = 18;

    // draw input neurons
    for (let i = 0; i < inputs.length; i++) {
      const x = Visualiser.#getNodeX(inputs, i, left, right);
      ctx.beginPath();
      ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }

    // draw outputs neurons
    for (let i = 0; i < outputs.length; i++) {
      const x = Visualiser.#getNodeX(outputs, i, left, right);
      ctx.beginPath();
      ctx.arc(x, top, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }

    // draw the axons between the input & output nodes
    for (let i = 0; i < inputs.length; i++) {
      for (let j = 0; j < outputs.length; j++) {
        ctx.beginPath();
        ctx.moveTo(Visualiser.#getNodeX(inputs, i, left, right), bottom);
        ctx.lineTo(Visualiser.#getNodeX(outputs, j, left, right), top);
        ctx.linewidth = 2;
        ctx.strokeStyle = "orange";
        ctx.stroke();
      }
    }
  }

  static #getNodeX(nodes, index, left, right) {
    return lerp(
      left,
      right,
      nodes.length == 1 ? 0.5 : index / (nodes.length - 1)
    );
  }
}
