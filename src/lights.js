var spotLight = new WHS.SpotLight({
  color: 0xffffff,
  intensity: 1,
  penumbra: 0.05,
  angle: 0.4,
  distance: 1000,

  position: [0, 50, ball.position.z],
});

spotLight.native.target = ball.native;

spotLight.addTo(app);

var directionalLight = new WHS.DirectionalLight({
  color: 0xffffff,
  intensity: 0.1,

  position: [0, 1500, ball.position.z]
});

directionalLight.addTo(app)

directionalLight.native.target = ball.native;

//var helper = new THREE.DirectionalLightHelper(directionalLight, 5 );
//scene.add( helper );
////Create a helper for the shadow camera (optional)
//helper = new THREE.CameraHelper( directionalLight.shadow.camera );
//scene.add( helper );
