let i = 0;
const loop = new WHS.Loop((clock) => {
  TWEEN.update(clock.getElapsedTime() * 1000);
});

loop.start(app);
app.start();

entrance();
