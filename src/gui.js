const GUI = {
  elements: {
    score: document.getElementById('score'),
    speed: document.getElementById('speed'),
    time: document.getElementById('time'),
    hits: document.getElementById('hits'),
  },
  setScore(s) {
    GUI.elements.score.textContent = Math.floor(s).toString().padStart(3, '0');
  },
  setSpeed(s) {
    GUI.elements.speed.textContent = Math.floor(s).toString().padStart(3, '0');
  },
  setStartingTime() {
    GUI.startingTime = moment();
  },
  setHits(s) {
    GUI.elements.hits.textContent = Math.floor(s).toString().padStart(2, '0');
  },
  tickTime() {
    const now = moment();
    const diff = moment.duration(now.diff(GUI.startingTime));
    const minutes = diff.minutes().toString().padStart(2, '0');
    const seconds = diff.seconds().toString().padStart(2, '0');
    const milliseconds = diff.milliseconds().toString().padStart(3, '0');
    GUI.elements.time.textContent = `${minutes}:${seconds}:${milliseconds}`;
  }
}
