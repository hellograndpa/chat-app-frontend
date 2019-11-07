const _C = document.querySelector('.container');
const N = _C.children.length;
const NF = 30;
const TFN = {
  'bounce-out': function(k, a = 2.75, b = 1.5) {
    return 1 - Math.pow(1 - k, a) * Math.abs(Math.cos(Math.pow(k, b) * (n + 0.5) * Math.PI));
  },
};

let i = 0;
let x0 = null;
let locked = false;
let w;
let ini;
let fin;
let rID = null;
let anf;
let n;

function stopAni() {
  cancelAnimationFrame(rID);
  rID = null;
}

function ani(cf = 0) {
  _C.style.setProperty('--i', ini + (fin - ini) * TFN['bounce-out'](cf / anf));

  if (cf === anf) {
    stopAni();
    return;
  }

  rID = requestAnimationFrame(ani.bind(this, ++cf));
}

function unify(e) {
  return e.changedTouches ? e.changedTouches[0] : e;
}

function lock(e) {
  x0 = unify(e).clientX;
  locked = true;
}

function drag(e) {
  e.preventDefault();

  if (locked) {
    const dx = unify(e).clientX - x0;
    const f = +(dx / w).toFixed(2);

    _C.style.setProperty('--i', i - f);
  }
}

function move(e) {
  if (locked) {
    const dx = unify(e).clientX - x0;
    const s = Math.sign(dx);
    let f = +((s * dx) / w).toFixed(2);

    ini = i - s * f;

    if ((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > 0.2) {
      i -= s;
      f = f;
    }

    fin = i;
    anf = Math.round(f * NF);
    n = 0 + Math.round(f);
    ani();
    x0 = null;
    locked = false;
  }
}

function size() {
  w = window.innerWidth;
}

size();
_C.style.setProperty('--n', N);

window.addEventListener('resize', size, false);

_C.addEventListener('mousedown', lock, false);
_C.addEventListener('touchstart', lock, false);

_C.addEventListener('mousemove', drag, false);
_C.addEventListener('touchmove', drag, false);

_C.addEventListener('mouseup', move, false);
_C.addEventListener('touchend', move, false);
