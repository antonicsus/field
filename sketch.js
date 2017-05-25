var forceMatrix = [];
var matrixStep = 20;
var steps;
var gridCorrector = matrixStep/2;

var noiseOffset = 0;

function AngleLine(x, y, angle) {
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.r = matrixStep/2-1;

  this.show = function(angle) {
    if (angle) {
      this.angle = angle;
    }
    var x1 = this.x + this.r*cos(this.angle);
    var y1 = this.y + this.r*sin(this.angle);
    var x2 = this.x + this.r*cos(this.angle+PI);
    var y2 = this.y + this.r*sin(this.angle+PI);
    line(x1, y1, x2, y2);
  }
}

function setup() {
  createCanvas(800, 800).parent('animation');
  steps = width / matrixStep;
  for (i=0; i<steps; i++) {
    forceMatrix.push([]);
    for (j=0; j<steps; j++) {
      forceMatrix[i][j] = new AngleLine(i*matrixStep+gridCorrector, j*matrixStep+gridCorrector, random(TWO_PI));
    }
  }
}

function draw() {
  background(255);
  stroke(0);

  for (i=0; i<steps; i++) {
    for (j=0; j<steps; j++) {
      var angle = map(noise(i*0.05, j*0.05, noiseOffset), 0, 1, 0, TWO_PI);
      forceMatrix[i][j].show(angle);
    }
  }
  noiseOffset += 0.05;
}
