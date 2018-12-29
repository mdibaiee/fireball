const entrance = () => {
  camera.position.set( 0, 200, 0 );

  const cameraTween = new TWEEN.Tween(camera.position)
                               .to({ x: 0, y: 40, z: 100 }, 3000)
                               .easing( TWEEN.Easing.Cubic.InOut )
                               .onUpdate(() => {
                                 camera.native.lookAt(ball.position);
                               });

  cameraTween.start();

  const spotLightTween = new TWEEN.Tween(spotLight.native)
                                .to({ intensity: 0, angle: 2, penumbra: 1 }, 1000)
                                .easing(TWEEN.Easing.Cubic.InOut);

  const directionalLightTween = new TWEEN.Tween(directionalLight.native)
                                  .to({ intensity: 0.5 }, 1000)
                                  .easing(TWEEN.Easing.Cubic.InOut);

  const groundTween = { ground: ground.rotation.x, camera: 40 }
  const groundStep = new TWEEN.Tween(groundTween)
                        .to({ ground: ground.rotation.x - rad(10), camera: 80 }, 3000)
                        .easing(TWEEN.Easing.Cubic.InOut)
                        .onUpdate(() => {
                          ground.rotation.set(groundTween.ground, ground.rotation.y, ground.rotation.z);
                          ground.__dirtyRotation = true;
                          camera.position.setY(groundTween.camera);
                          camera.position.setZ(ball.position.z + 130);
                          camera.native.lookAt(ball.position);
                        });

  spotLightTween.delay(2000).start();
  directionalLightTween.delay(2000).start();

  let chain = groundStep.delay(3000).start();
  chain.start();

  chain.onComplete(() => {
    GUI.setStartingTime();
    const diff = camera.position.y - ball.position.y;
    ball.started = true;

    audio.rumble.play();

    app.physics.addEventListener('update', function() {
      //camera.position.set(camera.position.x, ball.position.y + diff, ball.position.z + 130);
      camera.position.set(ball.position.x, ball.position.y + diff, ball.position.z + 130);
      camera.native.lookAt(ball.position);
      directionalLight.position.set(directionalLight.position.x, directionalLight.position.y, ball.position.z - 300);
      GUI.setScore(-ball.position.z / 100);
      GUI.tickTime();
      GUI.setSpeed(-ball.physics.getLinearVelocity().z);

      ball.checkLife();
      // ball.physics.setAngularVelocity({ x: -3, y: 0, z: 0 });
    });
  });

  //return chain;
}
