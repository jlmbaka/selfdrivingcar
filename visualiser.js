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
    const { inputs, outputs, weights } = level;
    const nodeRadius = 18;

    // draw the axons between the input & output nodes
    for (let i = 0; i < inputs.length; i++) {
      for (let j = 0; j < outputs.length; j++) {
        ctx.beginPath();
        ctx.moveTo(Visualiser.#getNodeX(inputs, i, left, right), bottom);
        ctx.lineTo(Visualiser.#getNodeX(outputs, j, left, right), top);
        ctx.lineWidth = 3;
        const value = weights[i][j];
        const alpha = Math.abs(value);
        const R = value < 0 ? 0 : 255;
        const G = R;
        const B = value > 0 ? 0 : 255;
        ctx.strokeStyle = `rgba(${R},${G},${B},${alpha})`;
        ctx.stroke();
      }
    }

    // draw input neurons
    for (let i = 0; i < inputs.length; i++) {
      drawNeuron(inputs, i, left, right, bottom);
    }

    // draw outputs neurons
    for (let i = 0; i < outputs.length; i++) {
      drawNeuron(outputs, i, left, right, top);
    }

    function drawNeuron(nodes, index, left, right, position) {
      const x = Visualiser.#getNodeX(nodes, index, left, right);
      ctx.beginPath();
      ctx.arc(x, position, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
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
