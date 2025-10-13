// ----=  Faces  =----
/* load images here */
let bgImage;
let bgImageSun;
let bgImageMoon;
let fadeAmount = 0; // 0 = moon, 1 = sun
let fadeSpeed = 0.05; // how fast the transition happens

// Moon stars globals
let moonStars = [];
let numMoonStars = 10;   // tune: 4-12

function prepareInteraction() {
  bgImage = loadImage('/images/background.png');
  bgImageSun = loadImage('/images/bgSun.jpg');
  bgImageMoon = loadImage('/images/bgMoon.jpg');

  initMoonStars(); // initialize star data
}

// init star data (radii will be recalculated per-face when drawing)
function initMoonStars() {
  moonStars = [];
  for (let i = 0; i < numMoonStars; i++) {
    moonStars.push({
      angle: random(0, TWO_PI),
      radiusOffset: random(0.6, 1.6),   // will multiply by face width later
      speed: random(0.01, 0.02) * (random() < 0.5 ? 1 : -1),
      size: random(20, 30),
      phase: random(0, TWO_PI)
    });
  }
}

let isMouthOpen = false;

function drawInteraction(faces, hands) {

  // if there is at least one face, decide mouth state from the first face
  if (faces.length > 0) {
    checkIfMouthOpen(faces[0]); // sets isMouthOpen based on first face
  } else {
    isMouthOpen = false;
  }

  // Smooth fade transition between backgrounds (do this once per frame)
  if (isMouthOpen) {
    fadeAmount = lerp(fadeAmount, 1, fadeSpeed); // fade toward sun
  } else {
    fadeAmount = lerp(fadeAmount, 0, fadeSpeed); // fade toward moon
  }

  // Draw backgrounds with blending (draw moon then sun on top with tint)
  push();
  tint(255, 255 * (1 - fadeAmount)); // Moon visibility
  image(bgImageMoon, 0, 0, 1280, 960);
  tint(255, 255 * fadeAmount); // Sun visibility
  image(bgImageSun, 0, 0, 1280, 960);
  noTint();
  pop();

  // for loop to capture if there is more than one face on the screen.
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; // face holds all the keypoints of the face
    if (showKeypoints) {
      drawPoints(face);
    }

    // (You already calculate a bunch of face variables — keep those as you like)
    // Example:
    let faceCenterX = face.faceOval.centerX;
    let faceCenterY = face.faceOval.centerY;
    let faceWidth = face.faceOval.width;
    let faceheight = face.faceOval.height;
    // ... (other local vars you already have)

    // Draw the correct face artwork
    if (isMouthOpen) {
      drawSunFace(face);
    } else {
      drawMoonFace(face);
    }
  }

  //------------------------------------------------------
  // You can make addtional elements here, but keep the face drawing inside the for loop.
}

// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one.
function drawPoints(feature) {
  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 5);
  }
  pop()
}

function drawMoonFace(face) {
  // local face vars
  let faceCenterX = face.faceOval.centerX;
  let faceCenterY = face.faceOval.centerY;
  let faceWidth = face.faceOval.width;
  let faceheight = face.faceOval.height;
  let leftEyeCenterX = face.leftEye.centerX;
  let leftEyeCenterY = face.leftEye.centerY;
  let leftEyeWidth = face.leftEye.width;
  let leftEyeHeight = face.leftEye.height;
  let lipsCenterX = face.lips.centerX;
  let lipsCenterY = face.lips.centerY;
  let lipsWidth = face.lips.width;
  let lipsHeight = face.lips.height;
  let rightEyeCenterX = face.rightEye.centerX;
  let rightEyeCenterY = face.rightEye.centerY;
  let rightEyeWidth = face.rightEye.width;
  let rightEyeHeight = face.rightEye.height;

  // Draw orbiting stars around the moon (draw BEFORE moon if you want stars behind)
  push();
  noStroke();
  for (let i = 0; i < moonStars.length; i++) {
    let s = moonStars[i];

    // scale radius to this face
    let baseRadius = faceWidth * 0.8;
    let orbitR = baseRadius * s.radiusOffset + (i % 2 === 0 ? faceWidth * 0.05 : -faceWidth * 0.05);

    // update angle
    s.angle += s.speed;

    // position
    let sx = faceCenterX + cos(s.angle) * orbitR;
    let sy = faceCenterY + sin(s.angle) * orbitR;

    // twinkle & wobble
    let twinkle = map(sin(frameCount * 0.1 + s.phase), -1, 1, 0.6, 1.0);
    let starSize = s.size * twinkle;

    push();
    translate(sx, sy);
    rotate(frameCount * 0.002 * (i % 2 === 0 ? 1 : -1));
    fill(255, 245, 180, 220 * twinkle);
    // simple cross-style star (fast)
    ellipse(0, 0, starSize, starSize * 0.35);
    ellipse(0, 0, starSize * 0.35, starSize);
    pop();
  }
  pop();

  // Base moon (ellipse around the face oval)
  fill(220);
  ellipse(faceCenterX, faceCenterY, faceWidth * 1.2, faceheight * 1.2);

  // Shading (simple overlay offset to one side)
  fill(180, 180, 190, 60);
  ellipse(faceCenterX - faceWidth * 0.1, faceCenterY - faceheight * 0.05, faceWidth, faceheight);

  // Eyes / eyebrows / mouth (your original drawing)
  fill(255); // white of the eye
  ellipse(leftEyeCenterX, leftEyeCenterY, leftEyeWidth * 1.2, leftEyeHeight * 1.2);
  fill(80); // pupil
  ellipse(leftEyeCenterX, leftEyeCenterY, leftEyeWidth * 0.4, leftEyeHeight * 0.4);

  fill(255);
  ellipse(rightEyeCenterX, rightEyeCenterY, rightEyeWidth * 1.2, rightEyeHeight * 1.2);
  fill(80);
  ellipse(rightEyeCenterX, rightEyeCenterY, rightEyeWidth * 0.4, rightEyeHeight * 0.4);

  stroke(120);
  strokeWeight(2);
  noFill();
  arc(face.leftEyebrow.centerX, face.leftEyebrow.centerY, face.leftEyebrow.width, face.leftEyebrow.height, PI, TWO_PI);
  arc(face.rightEyebrow.centerX, face.rightEyebrow.centerY, face.rightEyebrow.width, face.rightEyebrow.height, PI, TWO_PI);
  noStroke();

  fill(150);
  ellipse(lipsCenterX, lipsCenterY, lipsWidth, lipsHeight * 0.6);
  fill(100, 100, 100, 120);
  ellipse(lipsCenterX, lipsCenterY + lipsHeight * 0.1, lipsWidth * 0.6, lipsHeight * 0.4);
}

function drawSunFace(face) {
  // Add the same variable declarations here
  let faceCenterX = face.faceOval.centerX;
  let faceCenterY = face.faceOval.centerY;
  let faceWidth = face.faceOval.width;
  let faceHeight = face.faceOval.height;
  let leftEyeCenterX = face.leftEye.centerX;
  let leftEyeCenterY = face.leftEye.centerY;
  let leftEyeWidth = face.leftEye.width;
  let leftEyeHeight = face.leftEye.height;
  let lipsCenterX = face.lips.centerX;
  let lipsCenterY = face.lips.centerY;
  let lipsWidth = face.lips.width;
  let lipsHeight = face.lips.height;
  let rightEyeCenterX = face.rightEye.centerX;
  let rightEyeCenterY = face.rightEye.centerY;
  let rightEyeWidth = face.rightEye.width;
  let rightEyeHeight = face.rightEye.height;

  // Sun body
  fill(255, 200, 0);
  ellipse(faceCenterX, faceCenterY, faceWidth * 1.3, faceHeight * 1.3);

  // Wavy rays (your existing code kept)
  let r = faceWidth * 0.9;
  let rayLength = faceWidth * 0.9;
  let waveAmp = faceWidth * 0.15;
  let animate = true;

  for (let a = 0; a < TWO_PI; a += PI / 8) {
    let x1 = faceCenterX + cos(a) * r;
    let y1 = faceCenterY + sin(a) * r;
    let x3 = faceCenterX + cos(a) * (r + rayLength);
    let y3 = faceCenterY + sin(a) * (r + rayLength);
    let px = -sin(a);
    let py = cos(a);
    let phase = animate ? map(sin(frameCount * 0.02 + a * 3), -1, 1, -PI / 6, PI / 6) : 0;
    let ctrl1x = faceCenterX + cos(a - 0.18 + phase) * (r + rayLength * 0.35) + px * (waveAmp * 0.6);
    let ctrl1y = faceCenterY + sin(a - 0.18 + phase) * (r + rayLength * 0.35) + py * (waveAmp * 0.6);
    let ctrl2x = faceCenterX + cos(a + 0.18 + phase) * (r + rayLength * 0.6) - px * (waveAmp);
    let ctrl2y = faceCenterY + sin(a + 0.18 + phase) * (r + rayLength * 0.6) - py * (waveAmp);
    noStroke();
    fill(255, 215, 0, 220);
    beginShape();
    vertex(x1, y1);
    bezierVertex(ctrl1x, ctrl1y, ctrl2x, ctrl2y, x3, y3);
    let ctrl3x = faceCenterX + cos(a + 0.18 - phase) * (r + rayLength * 0.35) - px * (waveAmp * 0.6);
    let ctrl3y = faceCenterY + sin(a + 0.18 - phase) * (r + rayLength * 0.35) - py * (waveAmp * 0.6);
    let ctrl4x = faceCenterX + cos(a - 0.18 - phase) * (r + rayLength * 0.6) + px * (waveAmp);
    let ctrl4y = faceCenterY + sin(a - 0.18 - phase) * (r + rayLength * 0.6) + py * (waveAmp);
    bezierVertex(ctrl4x, ctrl4y, ctrl3x, ctrl3y, x1, y1);
    endShape(CLOSE);
  }

  // Eyes, eyebrows, mouth (kept same as before)
  fill(255);
  ellipse(leftEyeCenterX, leftEyeCenterY, leftEyeWidth * 1.2, leftEyeHeight * 1.2);
  ellipse(rightEyeCenterX, rightEyeCenterY, rightEyeWidth * 1.2, rightEyeHeight * 1.2);
  fill(50, 50, 0);
  ellipse(leftEyeCenterX, leftEyeCenterY, leftEyeWidth * 0.4, leftEyeHeight * 0.4);
  ellipse(rightEyeCenterX, rightEyeCenterY, rightEyeWidth * 0.4, rightEyeHeight * 0.4);

  stroke(80, 60, 0);
  strokeWeight(3);
  noFill();
  arc(face.leftEyebrow.centerX, face.leftEyebrow.centerY, face.leftEyebrow.width, face.leftEyebrow.height, PI, TWO_PI);
  arc(face.rightEyebrow.centerX, face.rightEyebrow.centerY, face.rightEyebrow.width, face.rightEyebrow.height, PI, TWO_PI);
  noStroke();

  fill(255, 100, 50);
  ellipse(lipsCenterX, lipsCenterY, lipsWidth, lipsHeight * 0.6);
}

function checkIfMouthOpen(face) {
  // Lips bounding box from facemesh
  let lipsHeight = face.lips.height;
  let lipsWidth = face.lips.width;

  // Heuristic: if mouth height is more than ~45% of its width, call it open
  isMouthOpen = (lipsHeight / lipsWidth > 0.45);
}