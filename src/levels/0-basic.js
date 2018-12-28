function level0() {
  const step = rad(10);
  const tan = Math.tan(step);
  const BOX_SIZE = 100;

  function add({ x, y, z } = {}, { width, depth, height } = {}, rotation = {}) {
    y = y || (tan * z) + BOX_SIZE/2;
    width = width || BOX_SIZE;
    height = height || BOX_SIZE;
    depth = depth || BOX_SIZE;

    rotation.x = rotation.x || -step;
    const box = new WHS.Box({
      geometry: {
        width,
        depth,
        height,
      },

      material: new THREE.MeshPhongMaterial({
        color: 0xffffff,
      }),

      position: [x, y, z],

      rotation,

      modules: [
        new PHYSICS.BoxModule({
          mass: 0,
          friction: 1,
          restitution: 0,
        })
      ]
    });

    box.addTo(app);
    return box;
  }

  const SPACE_UNIT = 250;

  const patterns = [{
    items: [3,4,5],
    randoms: {
      startX() {
        return Math.random() > 0.5 ? 200 : -200;
      },
    },
    x(i, props) {
      return props.startX + i * 50 * (props.startX === 200 ? -1 : 1);
    },
    z(i) {
      return i * -BOX_SIZE;
    },
  }, {
    items: [3,4,6],
    props: {
      side: 150,
    },
    rot: {
      y(i, props) {
        if (i % 3 == 0) {
          return THREE.Math.randFloatSpread(Math.PI);
        }
        return 0;
      }
    },
    size(i, props) {
      return THREE.Math.randInt(BOX_SIZE * 0.8, BOX_SIZE * 1.2);
    },
    x(i, props) {
      if (i % 3 == 0) {
        return 0;
      } else {
        return i % 3 == 1 ? props.side : -props.side;
      }
    },
    z(i) {
      if (i % 3 == 0) {
        return i * -SPACE_UNIT;
      } else {
        return i % 3 == 1 ? i * -SPACE_UNIT : (i - 1) * -SPACE_UNIT;
      }
    }
  }];


  const applyPattern = (sz, { items, x, z, rot, props, randoms, space, size } = {}) => {
    props = props || {};
    randoms = randoms || {};
    space = space || SPACE_UNIT;
    rot = rot || {};
    const count = rand(items);

    const rs = {};
    Object.entries(randoms).forEach(([key, value]) => {
      rs[key] = value();
    });

    Object.assign(props, rs);

    let zz;

    for (let i = 0; i < count; i++) {
      zz = sz + z(i, props);
      const rotation = {};
      Object.entries(rot).forEach(([key, value]) => {
        rotation[key] = value(i, props);
      });
      let boxSize = BOX_SIZE;
      if (size) {
        boxSize = size(i, props);
      }
      add({ x: x(i, props), z: zz }, { width: boxSize, height: boxSize, depth: boxSize }, rotation);
    }

    return zz - space;
  }

  let sz = -300;
  while (-sz < ground.SIZE) {
    const pattern = rand(patterns);
    sz = applyPattern(sz, pattern);
  }
}

