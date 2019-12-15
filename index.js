let mobilenet;
let img;
window.onerror = (errorMsg, url, lineNumber) => {
  console.log('----- ERROR ------');
  console.log(errorMsg, url, lineNumber);
  console.log('------------------');
  return false;
}

const show = (el, status) => {
  document.querySelector(el).classList[status ? 'remove' : 'add']('hide');
};

function modelReady() {
  console.log('model is ready!!');
}

function gotResult(error, results) {
  show('.loading', false);
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    const body = document.body;
    const container = document.createElement('div');
    results.forEach(data => {
      const porcent = nf(data.confidence, 0, 4) * 100;
      const progress = document.createElement('progress');
      const label = document.createElement('div');
      const info = document.createElement('span');
      label.innerHTML = `Elemento reconocidos: ${data.label}`;
      progress.setAttribute('max', 100);
      progress.setAttribute('value', porcent);
      info.innerHTML = ` ${porcent}%`;
      container.classList.add('result');
      container.appendChild(label);
      container.appendChild(progress);
      container.appendChild(info);
    });
    body.appendChild(container);
  }
}
window.onload = () => {
  show('.loading', true);
}
function imageReady() {
  image(img,0,0 , width, height);
  mobilenet.predict(img, gotResult);
}
function preload() {
  classifier = ml5.imageClassifier('MobileNet');
  img = loadImage('img1.jpg');
}

function setup() {
  createCanvas(640, 480);
  img = createImg('img1.jpg', imageReady);
  img.hide();
  background(0);
  mobilenet = ml5.imageClassifier('MobileNet',modelReady);
}
