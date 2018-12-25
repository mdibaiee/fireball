function level0() {
  function jumpBoard(x, z) {
    const cylinder = new WHS.Cylinder({
      geometry: {
        radiusTop: 50,
        radiusBottom: 1,
        radiusSegments: 3,
        heightSegments: 1,
        height: 2,
      },

      material: new THREE.MeshPhongMaterial({
        color: 0xffff00,
      }),

      position: [x, 0, z],
      rotation: [Math.PI, rad(-35), 0],

      modules: [
        new PHYSICS.CylinderModule({
          mass: 0,
        })
      ]
    });

    //cylinder.addTo(app);
    ground.add(cylinder);
  }

  //jumpBoard(5, -50);
  //jumpBoard(5, -100);
  //
  //ring({ x: 0, y: 10, z: -150 });
}

level0();
