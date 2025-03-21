const container = document.getElementById("hex-container");

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createHexagon() {
  const hex = document.createElement("div");
  hex.classList.add("hex");

  // Random start position
  const startX = random(0, window.innerWidth);
  const startY = random(0, window.innerHeight);

  // Random direction
  const angle = random(0, 2 * Math.PI);
  const distance = random(300, 800);
  const endX = startX + Math.cos(angle) * distance;
  const endY = startY + Math.sin(angle) * distance;
  const rotation = random(180, 720);

  hex.style.left = `${startX}px`;
  hex.style.top = `${startY}px`;

  container.appendChild(hex);

  // Delay next frame to allow transition to kick in
  requestAnimationFrame(() => {
    hex.style.transition = `transform 4s ease-out, opacity 1s ease-in`;
    hex.style.opacity = 1;
    hex.style.transform = `translate(${endX - startX}px, ${endY - startY}px) rotate(${rotation}deg) scale(1)`;
  });

  // Remove hex and spawn another when it's done
  setTimeout(() => {
    hex.remove();
    createHexagon(); // spawn the next one
  }, 4000); // matches transform duration
}

// Start with a few hexagons at once
for (let i = 0; i < 10; i++) {
  setTimeout(createHexagon, random(0, 2000));
}
