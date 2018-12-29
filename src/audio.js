const audio = {
  fire: new Howl({
    src: ['assets/audio/fire.wav'],
    autoplay: true,
    loop: true,
    volume: 0.5
  }),

  music: new Howl({
    src: ['assets/audio/music.mp3'],
    autoplay: true,
    loop: true,
    volume: 0.3,
  }),

  rumble: new Howl({
    src: ['assets/audio/rumble.wav'],
    autoplay: false,
    loop: true,
    volume: 0.2,
  }),

  impacts: [0, 1, 2].map(i => new Howl({
    src: [`assets/audio/impact-${i}.wav`],
    volume: 0.5
  })),
}

audio.fire.play();
audio.music.play();
