const ring = (position) => {
  new WHS.Torus({
    geometry: {
      radius: 15,
      tube: 7
    },

    material: new THREE.MeshPhongMaterial({
      color: 0xffffff,
    }),

    modules: [
    ],

    position,
  }).addTo(app);
}
