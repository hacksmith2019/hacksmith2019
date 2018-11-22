const $canvas = document.querySelector(".playground");
const ctx = $canvas.getContext("2d");

const simplex = new SimplexNoise();

const tileSize = { width: 32, height: 16 };

$canvas.width = window.innerWidth;
$canvas.height = window.innerHeight;

// ctx.translate($canvas.width / 2, $canvas.height / 5)

// ctx.fillStyle = '#f9f9f9'
// ctx.fillRect(0, 0, $canvas.width, $canvas.height)

// const drawTile = (x, y, color) => {
//   ctx.save()
//   ctx.translate((x - y) * tileSize.width / 2, (x + y) * tileSize.height / 2)

//   ctx.beginPath()
//   ctx.moveTo(0, 0)
//   ctx.lineTo(tileSize.width / 2, tileSize.height / 2)
//   ctx.lineTo(0, tileSize.height)
//   ctx.lineTo(-tileSize.width / 2, tileSize.height / 2)
//   ctx.closePath()

//   ctx.fillStyle = color
//   ctx.fill()

//   ctx.restore()
// }

const drawBlock = (x, y, z) => {
  const colors = {
    top: "#eee",
    right: "#ccc",
    left: "#999"
  };

  ctx.save();
  ctx.translate((x - y) * tileSize.width / 2, (x + y) * tileSize.height / 2);

  // TOP
  ctx.beginPath();
  ctx.moveTo(0, -z * tileSize.height);
  ctx.lineTo(tileSize.width / 2, tileSize.height / 2 - z * tileSize.height);
  ctx.lineTo(0, tileSize.height - z * tileSize.height);
  ctx.lineTo(-tileSize.width / 2, tileSize.height / 2 - z * tileSize.height);
  ctx.closePath();

  ctx.fillStyle = colors.top;
  ctx.fill();

  // LEFT
  ctx.beginPath();
  ctx.moveTo(-tileSize.width / 2, tileSize.height / 2 - z * tileSize.height);
  ctx.lineTo(0, tileSize.height - z * tileSize.height);
  ctx.lineTo(0, tileSize.height);
  ctx.lineTo(-tileSize.width / 2, tileSize.height / 2);
  ctx.closePath();

  ctx.fillStyle = colors.left;
  ctx.fill();

  // RIGHT
  ctx.beginPath();
  ctx.moveTo(tileSize.width / 2, tileSize.height / 2 - z * tileSize.height);
  ctx.lineTo(0, tileSize.height - z * tileSize.height);
  ctx.lineTo(0, tileSize.height);
  ctx.lineTo(tileSize.width / 2, tileSize.height / 2);
  ctx.closePath();

  ctx.fillStyle = colors.right;
  ctx.fill();

  ctx.restore();
};

// for (let x = 0; x < 20; x++) {
//   for (let y = 0; y < 20; y++) {
//     // drawBlock(x, y, Math.floor(Math.random() * 6))
//     // drawBlock(x, y, Math.random() * 4)
//   }
// }

ctx.translate($canvas.width / 2, $canvas.height / 5);

const tick = () => {
  window.requestAnimationFrame(tick);

  const time = Date.now() / 2500;

  ctx.translate(-$canvas.width / 2, -$canvas.height / 5);

  ctx.clearRect(0, 0, $canvas.width, $canvas.height);

  ctx.fillStyle = "#aaaaaa";
  ctx.fillRect(0, 0, $canvas.width, $canvas.height);

  ctx.translate($canvas.width / 2, $canvas.height / 5);

  for (let x = 0; x < 24; x++) {
    for (let y = 0; y < 24; y++) {
      drawBlock(x, y, 1 + simplex.noise2D(x / 15 + time, y / 15 + time) * 0.8);
    }
  }
};

tick();

