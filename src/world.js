const camera = new WHS.PerspectiveCamera({ // Apply a camera.
  position: {
    x: 0,
    y: 40,
    z: 100,
  },
  far: 1e5,
  aspect: window.innerWidth / window.innerHeight,
});

const app = new WHS.App([
  new WHS.ElementModule(), // Apply to DOM.
  new WHS.SceneModule(), // Create a new THREE.Scene and set it to app.

  new WHS.DefineModule('camera', camera),

  new PHYSICS.WorldModule({
    gravity: new THREE.Vector3(0, -100, 0),
    ammo: 'http://localhost:8080/lib/ammo.js',
  }),

  new WHS.RenderingModule({ bgColor: 0x162129 }), // Apply THREE.WebGLRenderer
  new WHS.ResizeModule(), // Make it resizable.
  new WHS.FogModule({
    color: 0x660000,
    density: 1e-4
  }, 'exp2'),
]);
app.camera = camera;
app.physics = app.modules[3];

let ground;

(function groundinit() {
  const WIDTH = 500;
  const SIZE = 1e5;
  const mesh = new WHS.Plane({
    geometry: {
      width: WIDTH,
      height: SIZE,
    },
    position: {
      x: 0,
      y: -10,
    },
    rotation: new THREE.Euler(-Math.PI / 2,0,0),
    modules: [
      new WHS.TextureModule({
        url: 'assets/textures/metal.png',
        repeat: new THREE.Vector2(2, SIZE / 200)
      }),
      new PHYSICS.PlaneModule({
        mass: 0,
      }),
    ],
    material: new THREE.MeshPhongMaterial({ color: 0xffffff })
  });

  ground = mesh;
  ground.addTo(app);
}());

(function lava() {
  const size = 1e5;
  const lava = new WHS.Plane({
    geometry: {
      width: size,
      height: size,
    },

    position: {
      x: 0,
      y: 0,
      z: -300,
    },

    //rotation: new THREE.Euler(-Math.PI / 2, 0, 0),
    modules: [
      new WHS.TextureModule({
        url: 'assets/textures/lava.jpg',
        repeat: new THREE.Vector2(size / 200, size / 200)
      }),
    ],
    material: new THREE.MeshPhongMaterial({
      color: 0xffffff,
    }),
  });

  //lava.addTo(app);
  //console.log(lava);
  ground.add(lava);
}());

(function sky() {
  const sky = new THREE.Sky();
  sky.scale.setScalar(450000);
  const uniforms = sky.material.uniforms;

  uniforms.turbidity.value = 10;
  uniforms.rayleigh.value = 2;
  uniforms.luminance.value = 1;
  uniforms.mieCoefficient.value = 0.005;
  uniforms.mieDirectionalG.value = 0.8;

  sunSphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry( 20000, 16, 8 ),
    new THREE.MeshBasicMaterial( { color: 0xffffff } )
  );
  sunSphere.position.y = 10000;

  var distance = 400000;

  const inclination = 0.5;
  const azimuth = 0.25;
  var theta = Math.PI * ( inclination - 0.5 );
  var phi = 2 * Math.PI * ( azimuth - 0.5 );

  sunSphere.position.x = distance * Math.cos( phi );
  sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
  sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );

  uniforms.sunPosition.value.copy( sunSphere.position );
  const sk = WHS.MeshComponent.create(sky.geometry, { material: sky.material });

  const scene = app.getScene();
  scene.add(sky);
  scene.add(sunSphere);
}());
