const controls = document.getElementById('controls');
const amountInput = controls.getElementsByTagName('input')[0];
const boxesContainer = document.getElementById('boxes');

const BOX_DIMENSION = 30;


controls.querySelectorAll('button').forEach(btn =>
  btn.addEventListener('click', onControlBtnClick)
);

function onControlBtnClick(e) {
  const action = e.target.dataset.action;
  if (action == 'create') {
    createBoxes(parseInt(amountInput.value));
  }
  else if (action == 'destroy') {
    destroyBoxes();
  }
}

function createBoxes(amount) {
  for (let i = 0; i < amount; i++) {
    boxesContainer.append(createBox());
  }
}

function createBox() {
  const box = document.createElement('div');
  const dimension = `${BOX_DIMENSION + boxesContainer.getElementsByTagName('div').length * 10}px`;
  box.setAttribute('style', `width: ${dimension}; height: ${dimension};`);
  box.style.backgroundColor = createRandomColor();
  return box;
}

function createRandomColor() {
  const MIN_LIGHT = 20;
  const MAX_LIGHT = 80;

  let hue = randomInt(0, 360 * 100);
  let sat = randomInt(50, 100);
  let light = randomInt(MIN_LIGHT, MAX_LIGHT);
  let color = HslToHex(hue, sat, light);
  return '#' + color.r + color.g + color.b;
}

function randomInt(min, max) { return Math.floor(min + Math.random() * (max + 1 - min)); }

function HslToHex(hue, sat, light) {
  hue %= 360;
  hue /= 60;
  sat /= 100;
  light /= 100;

  function hueToRgb(t1, t2, hue) {
    if (hue < 0) hue += 6;
    if (hue >= 6) hue -= 6;
    if (hue < 1) return (t2 - t1) * hue + t1;
    else if (hue < 3) return t2;
    else if (hue < 4) return (t2 - t1) * (4 - hue) + t1;
    else return t1;
  }

  let t1, t2;
  let red, green, blue;
  if (light <= 0.5) {
    t2 = light * (sat + 1);
  }
  else {
    t2 = light + sat - (light * sat);
  }
  t1 = light * 2 - t2;

  red = decToHex(Math.round(hueToRgb(t1, t2, hue + 2) * 255));
  green = decToHex(Math.round(hueToRgb(t1, t2, hue) * 255));
  blue = decToHex(Math.round(hueToRgb(t1, t2, hue - 2) * 255));
  return { r: red, g: green, b: blue };
}

function decToHex(val) {
  let hex = val.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function destroyBoxes() {
  boxesContainer.innerHTML = '';
}
