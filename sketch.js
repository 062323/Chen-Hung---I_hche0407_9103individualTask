let waveCount;
let startY = 450;
let waveHeight = 20;
let waves = []; // Set up waves array to store waves
let speed = 0.01; // Speed factor to slow down the wave movement
let particles = [];// Set up particles array to store particles
let shapes = [];// Set up shapes array to store the 3 shapes
let edgePoints = [];// set up edgePoints array to store the points that will appear on random position on the edge of the shapes

function setup() {
  createCanvas(windowWidth, windowHeight);
  setWaves();// call setWaves function
  randomSeed(99);
  drawBuilding();// call drawBuilding() for one time to setup the parameters
  // Convert shape points to vectors and interpolate points
  for (let shape of shapes) {
    let vertices = shape.map(pt => createVector(pt.x, pt.y));// pt = the elements in the shapes array, "=>" will map the { x: 0, y: 450 } to (pt.x, pt.y)
    // Now I got the vertex of all the shapes, I want to generate some interpolate points between each 2 vertices
    for (let i = 0; i < vertices.length; i++) {
      let start = vertices[i]; //start from vertex number i
      let end = vertices[(i + 1) % vertices.length]; // end from vertex number i+1, using % modulus to make sure that i+1 will back to the beginning of vertices[] when i+1 is > vertices's length
      interpolatePoints(start, end, 1000); // Feed the figures to interpolatePoints()
    }
  }


}

function draw() {
  background(222, 184, 93);
  drawSky(); // call drawSky function
  drawSkyReflection(); // call drawSkyReflection function
  drawBuilding(); // call drawBuilding every frame incase of windowResize update

  // This loop runs 10 times per frame
  for (let i = 0; i < 10; i++) {
    let p = new Particle();// create a new single particle( create 10 particles per frame )
    particles.push(p);// push the new particle into the particles array
  }

  // This loop will keep going as long as there are still particle left in the particles array 
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update(); // call update
    particles[i].show(); //call show
    //if the particle finish display
    if (particles[i].finished()) {
      particles.splice(i, 1);//splice(number i of the array, 1) remove 1 element from number i of the array
    }
  }



  let pt = random(edgePoints);//Create a parameter "pt" which is one of the point from edgePoints[]
  particles.push(new Particle(pt.x, pt.y));// Feed this point's coordinates to Particle class

  drawWave();
}

//This function generate "numPoints" of points between the given 2 vertices
function interpolatePoints(start, end, numPoints) {
  //This loop will runs "numPoints" times
  for (let i = 0; i <= numPoints; i++) {
    let t = i / numPoints;// parameter "t" ranges from 0 to 1
    let x = lerp(start.x, end.x, t); // lerp the x value of the edgePoints I want to create between start.x and end.x by t
    let y = lerp(start.y, end.y, t); // lerp the x value of the edgePoints I want to create between start.y and end.y by t
    edgePoints.push(createVector(x, y));// push the new point(edgePoints) I create into the array edgePoints
  }


}

//Particle system class
class Particle {

  //construct figures for every single particle
  constructor(x, y) { // get the x ,y value from line 139
    this.x = x; // particle x pos
    this.y = y;// particle y pos
    this.vx = random(-0.2, 0.2); // particle's x velocity
    this.vy = random(-0.5, -0.1);// particle's y velocity
    this.alpha = 255;// The transparency of the particle
    this.ptRadius = random(3, 5);

    this.r = map(this.y, 450, 19, 44, 252);//map the particle's r value from 44~252 according to its y position
    this.g = map(this.y, 450, 19, 0, 155);//map the particle's g value from 0~155 according to its y position
    this.b = map(this.y, 450, 19, 0, 112);//map the particle's b value from 0~112 according to its y position
  }

  //return when particle finish display (it's transparency < 0)
  finished() {
    return this.alpha < 0;
  }
  //update the particle movement
  update() {
    this.x += this.vx;
    this.y += this.vy * 3;
    this.alpha -= 1; // decrease the transparency of the particle over time

    this.r = map(this.y, 450, 19, 44, 252);//map the particle's r value from 44~252 according to its y position
    this.g = map(this.y, 450, 19, 0, 155);//map the particle's g value from 0~155 according to its y position
    this.b = map(this.y, 450, 19, 0, 112);//map the particle's b value from 0~112 according to its y position
  }

  //draw the particle
  show() {
    noStroke();
    fill(this.r, this.g, this.b, this.alpha);// fill particle with (colour,transparency)
    circle(this.x, this.y, this.ptRadius); //draw particle (x , y, radius)

  }
}
//Reference：The Coding Train. (2018). Coding Challenge #78: Simple Particle System. https://www.youtube.com/watch?v=UcdigVaIYAk

function drawBuilding() {
  //Set up the cordinates of the 3 shapes
  shapes = [
    // Building reflection
    [
      { x: 219, y: 450 },
      { x: 219, y: 614 },
      { x: 194, y: 671 },
      { x: 182, y: 755 },
      { x: 172, y: 671 },
      { x: 153, y: 614 },
      { x: 153, y: 450 }
    ],
    // Right side building
    [
      { x: width, y: 455 },
      { x: width - 800, y: 455 },
      { x: width - 563, y: 435 },
      { x: width - 524, y: 428 },
      { x: width - 480, y: 440 },
      { x: width - 332, y: 440 },
      { x: width - 300, y: 400 },
      { x: width - 290, y: 357 },
      { x: width - 270, y: 323 },
      { x: width - 250, y: 357 },
      { x: width - 224, y: 400 },
      { x: width - 220, y: 344 },
      { x: width - 204, y: 333 },
      { x: width - 200, y: 300 },
      { x: width - 187, y: 327 },
      { x: width - 170, y: 400 },
      { x: width - 155, y: 366 },
      { x: width, y: 418 }
    ],
    // Main building
    [
      { x: 567, y: 450 },
      { x: 548, y: 416 },
      { x: 520, y: 400 },
      { x: 433, y: 398 },
      { x: 425, y: 374 },
      { x: 435, y: 374 },
      { x: 395, y: 345 },
      { x: 386, y: 317 },
      { x: 383, y: 345 },
      { x: 365, y: 347 },
      { x: 332, y: 327 },
      { x: 290, y: 325 },
      { x: 290, y: 300 },
      { x: 262, y: 268 },
      { x: 249, y: 234 },
      { x: 241, y: 268 },
      { x: 219, y: 300 },
      { x: 219, y: 140 },
      { x: 194, y: 103 },
      { x: 182, y: 19 },
      { x: 172, y: 103 },
      { x: 153, y: 140 },
      { x: 153, y: 335 },
      { x: 132, y: 348 },
      { x: 65, y: 345 },
      { x: 35, y: 370 },
      { x: 28, y: 416 },
      { x: 0, y: 416 },
      { x: 0, y: 450 }
    ]
  ];

  // draw the custom shapes
  for (let shape of shapes) {
    fill(0);
    noStroke();

    //fill the colour of the building shapes with gradient
    linearGradient(
      182, 755, //Start point     
      182, 19, //End point
      color(252, 158, 112), //Start color
      color(44, 0, 0), //Mid color
      color(252, 155, 112), //End color
    );


    // draw the 3 shapes using the vertex I stored in edgePoints[]
    beginShape();
    for (let pt of shape) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);
    filter(BLUR, 3);// blur these shapes above

  }

}

//resize the window view
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setWaves(); // Reset wave parameters
}

//This function is used to calculate the gradient of the buildings
function linearGradient(sX, sY, eX, eY, colorS, colorM, colorE) { //Input (start point x, y, end point x, y, start colour, mid colour, end colour)
  let gradient = drawingContext.createLinearGradient(
    sX, sY, eX, eY
  );
  //add colour stop for the gradient
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(0.4, colorM);
  gradient.addColorStop(1, colorE);
  drawingContext.fillStyle = gradient;// fill the colour with gradient
}
//Reference：Kazuki Umeda. (2022). Easiest Gradient Effect - p5.js tutorial. https://www.youtube.com/watch?v=-MUOweQ6wac&t=62s

//This function is used to draw the gradual background sky
function drawSky() {
  // Loop through the upper half of the canvas height
  for (let y = 0; y < height / 2; y++) {
    // Loop through the upper half of the canvas height
    let inter = map(y, 0, height / 2, 0, 1);
    let c;// Variable to hold the color for the current line

    // Interpolate the color based on the position
    if (inter < 0.5) {
      // For the first half, interpolate from dark blue to cyan
      c = lerpColor(color(8, 8, 8), color(0, 150, 188), inter * 2); // dark blue to cyan
    } else {
      // For the second half, interpolate from cyan to orange
      c = lerpColor(color(0, 150, 188), color(255, 128, 90), (inter - 0.5) * 2); // cyan to Orange
    }

    stroke(c); // Set the stroke color to the calculated color
    line(0, y, width, y);  // Draw a horizontal line across the width of the canvas at the current y position
  }
}

//This function is used to draw the grandual background sky's reflection
function drawSkyReflection() {
  // Loop through the lower half of the canvas height
  for (let y = height / 2; y < height; y++) {
    // Calculate the interpolation factor from 0 to 1 for the current line
    let inter = map(y, height / 2, height, 0, 1);
    let c;// Variable to hold the color for the current line

    // Interpolate the color based on the position
    if (inter < 0.5) {
      // For the first half, interpolate from orange to navy blue
      c = lerpColor(color(255, 120, 90), color(0, 38, 60), inter * 2); // orange to navy blue
    } else {
      // For the second half, interpolate from yellow to blue
      c = lerpColor(color(0, 38, 60), color(8, 8, 8), (inter - 0.5) * 2); // navy blue to dark blue
    }

    stroke(c); // Set the stroke color to the calculated color
    line(0, y, width, y);// Draw a horizontal line across the width of the canvas at the current y position
  }
}
//Reference of colour set: HTML color codes. (n.d.). HTML Color Codes. https://htmlcolorcodes.com/
//Reference of gradient: P5.js example - Vertical Gradient. (2021, January 24). Happy Coding. https://happycoding.io/tutorials/p5js/for-loops/vertical-gradient

function setWaves() {
  waveCount = windowHeight / 40;
  waves = []; // Clear existing waves in case of resize

  //This function is used to set up the wave
  for (let i = 0; i < waveCount; i++) {
    let y = startY + i * waveHeight; //y pos of the wave
    let randomAmplitude = random(5, 20); // The random amplitude of the wave
    let randomFrequency = random(0.01, 0.05); // The random frequency of the wave.
    let c1 = lerpColor(color(62, 192, 204), color(0, 0, 0), i / waveCount); //The starting color of the wave gradient.
    let c2 = lerpColor(color(62, 192, 204), color(0, 0, 0), (i + 1) / waveCount); //The ending color of the wave gradient.

    //adds a new wave object to the waves array.
    waves.push({
      y: y,
      randomAmplitude: randomAmplitude,
      randomFrequency: randomFrequency,
      c1: c1,
      c2: c2
    });
  }
}

//This function is used to draw the wave
function drawWave() {
  noFill();

  //loop through each wave
  for (let i = 0; i < waves.length; i++) {
    let wave = waves[i];
    //draw each line within a wave
    for (let j = 0; j < waveHeight; j++) {
      let inter = map(j, 0, waveHeight, 0, 1);//map the position within the wave to interpolate between colors
      //reference | p5.js. (n.d.-b). P5js.org. https://p5js.org/reference/#/p5/map
      let c = lerpColor(wave.c1, wave.c2, inter);
      stroke(c);

      beginShape();//begin the shape for each wave line
      for (let x = 0; x <= width + 9; x += 10) {//calculate the wave offset
        let waveOffset = sin((x * wave.randomFrequency) + (frameCount * speed) + i * 0.1) * wave.randomAmplitude * (waveHeight - j) / waveHeight;
        vertex(x, wave.y + waveOffset);//Specified vertex
      }
      endShape();
    }
  }
}


