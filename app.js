const player = document.getElementById('player');
const Beyonce = document.getElementById('Beyonce');
const gameArea = document.getElementById('Game-Area');

let playerPosition = { x: 100, y: 100 };
let BeyoncePosition = { x: 300, y: 300 };

let playerSpeed = 40;
let BeyonceSpeed = 2;

// Estado del juego
let paused = false;

// Controles del panel
const playerSpeedInput = document.getElementById('playerSpeedInput');
const enemySpeedInput = document.getElementById('enemySpeedInput');
const backgroundSelect = document.getElementById('backgroundSelect');
const pauseBtn = document.getElementById('pauseBtn');

const playerSpeedValue = document.getElementById('playerSpeedValue');
const enemySpeedValue = document.getElementById('enemySpeedValue');

// 🎛️ Ajustes dinámicos
playerSpeedInput.addEventListener('input', () => {
  playerSpeed = parseInt(playerSpeedInput.value);
  playerSpeedValue.textContent = playerSpeed;
});

enemySpeedInput.addEventListener('input', () => {
  BeyonceSpeed = parseInt(enemySpeedInput.value);
  enemySpeedValue.textContent = BeyonceSpeed;
});

backgroundSelect.addEventListener('change', () => {
  const value = backgroundSelect.value;
  gameArea.style.background = value.includes('url')
    ? `url(${value.split("'")[1]}) center/cover`
    : value;
});

// ⏸️ Botón de pausa / reanudar
pauseBtn.addEventListener('click', () => {
  paused = !paused;
  pauseBtn.textContent = paused ? '▶️ Reanudar' : '⏸️ Pausar';
});

// Movimiento del jugador
window.addEventListener('keydown', (event) => {
  if (paused) return; // no mover si está pausado

  switch (event.key) {
    case 'ArrowUp':
      if (playerPosition.y > 0) playerPosition.y -= playerSpeed;
      break;
    case 'ArrowDown':
      if (playerPosition.y < gameArea.clientHeight - 50) playerPosition.y += playerSpeed;
      break;
    case 'ArrowLeft':
      if (playerPosition.x > 0) playerPosition.x -= playerSpeed;
      break;
    case 'ArrowRight':
      if (playerPosition.x < gameArea.clientWidth - 50) playerPosition.x += playerSpeed;
      break;
  }
  updatePositions();
});

// Movimiento del enemigo
function moveBeyonce() {
  if (paused) return; // detener el movimiento si está pausado

  if (BeyoncePosition.x < playerPosition.x) BeyoncePosition.x += BeyonceSpeed;
  else if (BeyoncePosition.x > playerPosition.x) BeyoncePosition.x -= BeyonceSpeed;

  if (BeyoncePosition.y < playerPosition.y) BeyoncePosition.y += BeyonceSpeed;
  else if (BeyoncePosition.y > playerPosition.y) BeyoncePosition.y -= BeyonceSpeed;

  updatePositions();
  checkCollision();
}

// Actualizar posiciones
function updatePositions() {
  player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
  Beyonce.style.transform = `translate(${BeyoncePosition.x}px, ${BeyoncePosition.y}px)`;
}

// Detección de colisiones
function checkCollision() {
  if (Math.abs(playerPosition.x - BeyoncePosition.x) < 50 &&
      Math.abs(playerPosition.y - BeyoncePosition.y) < 50) {
    alert('¡Beyoncé te atrapó!');
    playerPosition = { x: 100, y: 100 };
    BeyoncePosition = { x: 300, y: 300 };
    updatePositions();
  }
}

// Bucle del juego
function gameLoop() {
  moveBeyonce();
  requestAnimationFrame(gameLoop);
}

updatePositions();
gameLoop();
