function getOneDecimal(num) {
  return parseFloat(num.toFixed(2) + 0.5);
}

const mouse = {
decimal(coord) {
  return getOneDecimal(coord / 1000);
},
x(e) {
  return Math.abs(e.clientX - window.innerWidth / 2);
},
y(e) {
  return Math.abs(e.clientY - window.innerHeight / 2);
} };

const changeTextAlphaVal = (txt, e) => {
  const root = document.querySelector(":root");
  const cssVar = "--alpha";
  const currentAlpha = getComputedStyle(root).
  getPropertyValue(cssVar).
  trim();

  const max = parseFloat(currentAlpha);
  const dx = mouse.decimal(mouse.x(e));
  const dy = mouse.decimal(mouse.y(e));

  let alphaVal;
  if (dx <= 0) {
    alphaVal = dy >= max ? dy : getOneDecimal(max - dy);
  } else {
    alphaVal = dx >= max ? dx : getOneDecimal(max - dx);
  }

  txt.style.setProperty(cssVar, alphaVal);
};

function createShadow(e, _this) {
  const walk = 150;
  const coordWalk = (coord, side) => Math.round(coord / side * walk - walk / 2);
  const xWalk = coordWalk(e.clientX, _this.offsetWidth);
  const yWalk = coordWalk(e.clientY, _this.offsetHeight);

  const col1 = [255, 0, 139];
  const col2 = [0, 86, 255];
  const col3 = [255, 240, 0];
  const typoAlpha = 0.3;

  const typo = _this.querySelector(".typo");
  changeTextAlphaVal(typo, e); // Comment this if you don't want the text alpha opacity to change on interaction

  typo.style.textShadow = `
	  ${xWalk}px ${yWalk}px 0 rgba(${col1}, ${typoAlpha}),
	  ${xWalk * -1}px ${yWalk * 2}px 0 rgba(${col2}, ${typoAlpha}),
	  ${xWalk * -2}px ${yWalk * -1}px 0 rgba(${col3}, ${typoAlpha})
	`;
}

function onMouseMove(e) {
  createShadow(e, this);
}
function onTouchMove(e) {
  createShadow(e.changedTouches[0], this);
}

const heading = document.querySelector(".heading");
heading.addEventListener("mousemove", onMouseMove, false);
heading.addEventListener("touchmove", onTouchMove, false);
