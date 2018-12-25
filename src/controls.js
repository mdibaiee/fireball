const DFORCE = 3e3;
const AFORCE = 500;
const VFORCE = 1e4;

Mousetrap.bind('left', () => {
  if (!ball.started) return;
  ball.physics.applyCentralForce({ x: -DFORCE, y: 0, z: 0 });
});

Mousetrap.bind('right', () => {
  if (!ball.started) return;
  ball.physics.applyCentralForce({ x: DFORCE, y: 0, z: 0 });
});

Mousetrap.bind('up', () => {
  if (!ball.started) return;
  ball.physics.applyCentralForce({ x: 0, y: 0, z: -AFORCE });
  //ball.speed = Math.min(config.MAX_SPEED, Math.max(config.FINAL_SPEED, ball.speed + config.SPEED_INCREASE));
  //ball.methods.updateVelocity();
});

Mousetrap.bind('space', () => {
  if (!ball.started) return;
  if (ball.physics.data.touches.length) {
    ball.physics.applyCentralForce({ x: 0, y: VFORCE, z: 0 });
  }
  //ball.speed = Math.min(config.MAX_SPEED, Math.max(config.FINAL_SPEED, ball.speed + config.SPEED_INCREASE));
  //ball.methods.updateVelocity();
});

Mousetrap.bind('down', () => {
  if (!ball.started) return;
  ball.physics.applyCentralForce({ x: 0, y: 0, z: AFORCE * 3 });
  //ball.speed = Math.min(config.MAX_SPEED, Math.max(config.FINAL_SPEED, ball.speed - config.SPEED_INCREASE));
  //ball.methods.updateVelocity();
});


