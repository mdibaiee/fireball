const RADIUS = 10;
const SEGMENTS = 40;
const ballPhysics = new PHYSICS.SphereModule({
  mass: 2,
  friction: 0.5,
});

const ball = new WHS.Sphere({
  geometry: {
    radius: RADIUS,
    widthSegments: SEGMENTS,
    heightSegments: SEGMENTS,
  },
  position: {
    z: -30,
    y: 10
  },
  material: new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    emissive: 0xFF0000,
    emissiveIntensity: 0.4,
  }),

  modules: [
    new WHS.TextureModule({
      url: 'assets/textures/fire.jpg',
    }),
    ballPhysics,
  ],
});

ball.physics = ballPhysics;

ball.addTo(app);

camera.native.target = ball.native;

ball.checkLife = () => {
  if (ball.position.x > ground.geometry.parameters.width / 2
      || ball.position.x < -ground.geometry.parameters.width / 2
      || ball.position.z > -ground.SIZE) {
    location.reload();
  }
}

(function fire() {

  const FIRE_HEIGHT = 35;
  const FIRE_HEIGHT_RANDOMNESS = 0.4;
  const SPREAD_SPEED = 5;

  new THREE.Geometry();
  var particleCount = 20000,
      particles = new THREE.Geometry(),
      pMaterial = new THREE.PointsMaterial({
        size: 1.5,
        blending: THREE.AdditiveBlending,
        transparent: true,
        vertexColors: THREE.VertexColors,
        opacity: 0.3,
      });

  new THREE.Geometry();
  var spriteCount = 3000,
      sprites = new THREE.Geometry(),
      spriteMap = new THREE.TextureLoader().load('assets/textures/fire-sprite-small.png'),
      spriteMaterial = new THREE.PointsMaterial({
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.5,
        size: 5,
        map: spriteMap,
        color: 0xffffff,
      });

  const radius = ball.params.geometry.radius;
  const start = ball.position;
  for (var p = 0; p < particleCount; p++) {
    var pX = start.x + THREE.Math.randFloatSpread(radius),
        pY = start.y + THREE.Math.randFloatSpread(radius),
        pZ = start.z + THREE.Math.randFloatSpread(radius),
        particle = new THREE.Vector3(pX, pY, pZ)

    particle.lifetime = Math.random() < 0.5 ? 0 : ball.params.geometry.radius + THREE.Math.randFloat(0.5, 1 + FIRE_HEIGHT_RANDOMNESS) * FIRE_HEIGHT;

    particles.vertices.push(particle);
    particles.colors.push(new THREE.Color(1, 0, 0));
  }

  for (var i = 0; i < spriteCount; i++) {
    var pX = start.x + THREE.Math.randFloatSpread(radius),
        pY = start.y + THREE.Math.randFloatSpread(radius),
        pZ = start.z + THREE.Math.randFloatSpread(radius),
        particle = new THREE.Vector3(pX, pY, pZ)

    particle.lifetime = Math.random() < 0.5 ? 0 :  ball.params.geometry.radius + THREE.Math.randFloat(0.5, 1 + FIRE_HEIGHT_RANDOMNESS) * FIRE_HEIGHT;

    sprites.vertices.push(particle);
  }


  // create the particle system
  var points = WHS.MeshComponent.from(new THREE.Points(particles, pMaterial));
  var spritesPoints = WHS.MeshComponent.from(new THREE.Points(sprites, spriteMaterial));

  ball.fire = [points, spritesPoints];
  ball.fire.forEach(fire => {
    fire.addTo(app);
  })

  app.physics.addEventListener('update', function() {
    const velocity = ball.physics.getLinearVelocity();

    ball.fire.forEach(fire => {
      fire.position.set(
        ball.position.x,
        ball.position.y - ball.params.geometry.radius,
        ball.position.z + ball.params.geometry.radius * 3
      );

      fire.geometry.vertices.forEach((v, i) => {
        let x = v.x + THREE.Math.randFloatSpread(SPREAD_SPEED) + velocity.x * -0.02;
        let y = v.y + THREE.Math.randFloat(0, SPREAD_SPEED / 4);
        let z = v.z + THREE.Math.randFloatSpread(SPREAD_SPEED) + velocity.z * -0.01;

        v.set(x, y, z);

        if (!v.isSmoke && fire.material.vertexColors === THREE.VertexColors) {
          fire.geometry.colors[i].offsetHSL(7e-4, 0, 0);
        }

        if (v.y >= v.lifetime) {
          if (!v.isSmoke && fire.material.vertexColors === THREE.VertexColors) {
            v.isSmoke = true;
            fire.geometry.colors[i].setHex(0x444444)
            v.lifetime += FIRE_HEIGHT * 0.5;
          } else {
            y = Math.min(radius, radius * velocity.z / -50);

            x = 0;
            z = -ball.params.geometry.radius * 3;

            v.lifetime = ball.params.geometry.radius + THREE.Math.randFloat(1, 1 + FIRE_HEIGHT_RANDOMNESS) * FIRE_HEIGHT;

            v.set(x, y, z);

            v.isSmoke = false;

            if (fire.material.vertexColors === THREE.VertexColors) {
              const r = THREE.Math.randFloat(0.8, 1);
              const g = THREE.Math.randFloat(0, 0.2);
              const b = THREE.Math.randFloat(0, 0.2);
              fire.geometry.colors[i].setRGB(r, g, b);
            }
          }
        }
      });

      if (fire.material.vertexColors === THREE.VertexColors) {
        fire.geometry.colorsNeedUpdate = true;
      }
      fire.geometry.verticesNeedUpdate = true;
    });
  });

  const fireLight = new WHS.PointLight({
    color: 0xff0000,
    intensity: 5,
  });
  ball.fireLight = fireLight;
  ball.add(fireLight);
}());

let hits = 0;
ball.on('collision', (o, v, r, cn) => {
  if (o.uuid === ground.native.uuid) return;
  rand(audio.impacts).play();
  hits++;
  GUI.setHits(hits);
});
