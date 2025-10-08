function main() {
  if (!window.createUnityInstance || !window.unityConfig) {
    throw new Error('No Unity Loader Script Loaded');
  }

  var canvas = document.querySelector('#unity-canvas');
  var backgroundImage = document.querySelector('#background-image');
  var loadingBar = document.querySelector('#unity-loading-bar');
  var loadingBarEmpty = document.querySelector('#unity-progress-bar-empty');
  var loadingBarFull = document.querySelector('#unity-progress-bar-full');

  backgroundImage.style.display = 'block';
  loadingBar.style.display = 'block';

  var handleResize = function () {
    var height = 1080;
    var width = 1920;
    var canvasToWindowRatio = height / window.innerHeight;

    if (canvasToWindowRatio > width / window.innerWidth) {
      width = Math.min(window.innerWidth * canvasToWindowRatio, width);
      canvas.width = width;
      canvas.style.width = `${width / canvasToWindowRatio}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }
    else {
      canvasToWindowRatio = width / window.innerWidth;

      height = Math.min(window.innerHeight * canvasToWindowRatio, height);
      canvas.height = height;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${height / canvasToWindowRatio}px`;
    }
    loadingBarEmpty.style.transform = `scale(${1 / canvasToWindowRatio})`;
  };

  var onProgress = function (progress) {
    var gradient = `linear-gradient(to right, white 0%, ${100 * progress}%, transparent ${100 * progress}%)`;

    loadingBarFull.style.maskImage = gradient;
    loadingBarFull.style.webkitMaskImage = gradient;
  };

  var onSuccess = function () {
    backgroundImage.style.display = 'none';
    loadingBar.style.display = 'none';
    handleResize();
  };

  var onFailure = function (e) {
    alert(e);
  };

  window.createUnityInstance(canvas, unityConfig, onProgress).then(onSuccess).catch(onFailure);
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);
}

window.addEventListener('load', main, { once: true });
