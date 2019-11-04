const _C = document.querySelector('.container');
const N = _C.children.length;
const NF = 30;
const TFN = {
  /* can remove these if not used
				'linear': function(k) { return k }, 
				'ease-in': function(k, e = 1.675) {
					return Math.pow(k, e)
				}, 
				'ease-out': function(k, e = 1.675) {
					return 1 - Math.pow(1 - k, e)
				}, 
				'ease-in-out': function(k) {
					return .5*(Math.sin((k - .5)*Math.PI) + 1)
				}, */
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

addEventListener('resize', size, false);

_C.addEventListener('mousedown', lock, false);
_C.addEventListener('touchstart', lock, false);

_C.addEventListener('mousemove', drag, false);
_C.addEventListener('touchmove', drag, false);

_C.addEventListener('mouseup', move, false);
_C.addEventListener('touchend', move, false);

// html

<div className="container">
  <img
    src="https://images.unsplash.com/photo-1514117445516-2ecfc9c4ec90?ixlib=rb-0.3.5&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ&amp;s=0e0b58fcf67fa6e8a010322d617e39af"
    alt="Mountain massif, sunbathed, partly covered in show."
  />
  <img
    src="https://images.unsplash.com/photo-1510325805092-2951ab330b7d?ixlib=rb-0.3.5&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ&amp;s=017cf46443f4821a375c20e8c68e37f0"
    alt="Tiny bird with pale brown, orange and white feathers in an evergreen tree."
  />
  <img
    src="https://images.unsplash.com/photo-1514848567240-a81cb051807a?ixlib=rb-0.3.5&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ&amp;s=3a0e476ab712db0eb68ab121a21c54de"
    alt="Close-up of yellow rose opening up."
  />
  <img
    src="https://images.unsplash.com/photo-1465408522361-a6f502298219?ixlib=rb-0.3.5&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ&amp;s=7a6bd1244c42d1dbd3984a4c13981666"
    alt="Fast and foamy creek in the middle of the forest."
  />
  <img
    src="https://images.unsplash.com/photo-1503843778847-2b8bdce2ed3d?ixlib=rb-0.3.5&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ&amp;s=d547781176ce182eeeb7303bac05abf4"
    alt="Fluffy little tabby with blue eyes climbing up a tree."
  />
</div>;

///css

* { margin: 0 }

body { overflow-x: hidden }

.container {
	--n: 1;
	display: flex;
	align-items: center;
	overflow-y: hidden;
	width: 100%; // fallback
	width: calc(var(--n)*100%);
	height: 50vw; max-height: 100vh;
	transform: translate(calc(var(--i, 0)/var(--n)*-100%));
	
	img {
		width: 100%; // fallback
		width: calc(100%/var(--n));
		user-select: none;
		pointer-events: none
	}
}