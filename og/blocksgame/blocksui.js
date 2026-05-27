var root = "blocksgame/";
var bgStart,
  bgEnd,
  buttonPlay,
  buttonRestart,
  buttonMenu;
var loadedCount = 0;
var imageLoaded = function() {
  ++loadedCount;
  if (loadedCount >= 2) {
    showStart();
  }
};
bgStart = new Image();
bgStart.src = root + "bgStart.png";
bgStart.onload = imageLoaded;
bgEnd = new Image();
bgEnd.src = root + "bgEnd.png";
bgEnd.onload = imageLoaded;
buttonPlay = new Image();
// buttonPlay.src = root + "buttonPlay.png";
// buttonPlay.onload = imageLoaded;
// buttonRestart = new Image();
// buttonRestart.src = root + "buttonRestart.png";
// buttonRestart.onload = imageLoaded;
// buttonMenu = new Image();
// buttonMenu.src = root + "buttonMenu.png";
// buttonMenu.onload = imageLoaded;

// Show startscreen
function showStart() {
  var canvas = document.getElementById("blocksgame");
  var context2d = canvas.getContext("2d");
  context2d.drawImage(bgStart, 0, 0, canvas.width, canvas.height);
  document.getElementById("score").innerHTML = "Poäng: 0";
  canvas.onclick = function() {
    canvas.onclick = null;
    startGame(
      function(score) {
        document.getElementById("score").innerHTML = "Poäng: " + score;
      },
      function() {
        // Save highscore
        // *highscore is saved on this line*
        showEnd();
      },
      function(paused) {
        if (paused) {
          var canvas = document.getElementById("blocksgame");
          canvas.getContext("2d").drawImage(tintImage(canvas, "#000000"), 0, 0, canvas.width, canvas.height);
        }
      }
    );
  }
}

// Show gameover screen
function showEnd() {
  var canvas = document.getElementById("blocksgame");
  var context2d = canvas.getContext("2d");
  context2d.drawImage(bgEnd, 0, 0, canvas.width, canvas.height);
  canvas.onclick = function() {
    canvas.onclick = null;
    showStart();
  }
}

// There is no winning screen because in tetris you cannot win

function startGame(onScore, onGameOver, onPause) {
  var loadedImagesCount = 0;
  var imageLoaded = function() {
    ++loadedImagesCount;
    if (loadedImagesCount >= 2) {
      Blocksgame.startGame(
        args.images,
        args.fieldSize,
        args.fieldPos,
        args.fieldMeasure,
        args.previewPos,
        onGameOver,
        onPause,
        onScore);
    }
  }
  var images = {
    blocks: new Image(),
    bg: new Image()
  };
  images.blocks.src = root + "brick.png";
  images.blocks.onload = imageLoaded;
  images.bg.src = root + "bgImageBlocks.png";
  images.bg.onload = imageLoaded;
  var args = {
    images: images,
    fieldSize: { x: 10, y: 20 },
    fieldPos: { x: 38, y: 44 },
    fieldMeasure: { x: 240, y: 417 },
    previewPos: { x: 270, y: 70 }
  };
};