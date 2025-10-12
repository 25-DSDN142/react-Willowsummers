// ----=  Faces  =----
/* load images here */
let bgImage;
let bgImageSun;
let bgImageMoon;

function prepareInteraction() {

  bgImage = loadImage('/images/background.png');

  bgImageSun = loadImage('/images/bgSun.jpg');
  bgImageMoon = loadImage('/images/bgMoon.jpg');
}
let isMouthOpen = false;
function drawInteraction(faces, hands) {

  // for loop to capture if there is more than one face on the screen. This applies the same process to all faces. 
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; // face holds all the keypoints of the face\
    console.log(face);
    if (showKeypoints) {
      drawPoints(face)
    }
  
  
    // Face basics
    let faceCenterX = face.faceOval.centerX;
    let faceCenterY = face.faceOval.centerY;
    let faceWidth = face.faceOval.width;
    let faceheight = face.faceOval.height;
    // Left eye
    let leftEyeCenterX = face.leftEye.centerX;
    let leftEyeCenterY = face.leftEye.centerY;
    let leftEyeWidth = face.leftEye.width;
    let leftEyeHeight = face.leftEye.height;
    // Left eyebrow
    let leftEyebrowCenterX = face.leftEyebrow.centerX;
    let leftEyebrowCenterY = face.leftEyebrow.centerY;
    let leftEyebrowWidth = face.leftEyebrow.width;
    let leftEyebrowHeight = face.leftEyebrow.height;
    // Lips
    let lipsCenterX = face.lips.centerX;
    let lipsCenterY = face.lips.centerY;
    let lipsWidth = face.lips.width;
    let lipsHeight = face.lips.height;
    // Right eye
    let rightEyeCenterX = face.rightEye.centerX;
    let rightEyeCenterY = face.rightEye.centerY;
    let rightEyeWidth = face.rightEye.width;
    let rightEyeHeight = face.rightEye.height;
    // Right eyebrow
    let rightEyebrowCenterX = face.rightEyebrow.centerX;
    let rightEyebrowCenterY = face.rightEyebrow.centerY;
    let rightEyebrowWidth = face.rightEyebrow.width;
    let rightEyebrowHeight = face.rightEyebrow.height;

    /*
    Start drawing on the face here
    */
   // noStroke()
    //fill(225, 225, 0);
    // fill(get(leftEyeCenterX, leftEyeCenterY))

   // ellipse(leftEyeCenterX, leftEyeCenterY, leftEyeWidth, leftEyeHeight);

   // drawPoints(face.leftEye);
//drawPoints(face.leftEyebrow);
    //drawPoints(face.lips);
   // drawPoints(face.rightEye);
//drawPoints(face.rightEyebrow);




   // drawX(rightEyeCenterX,rightEyeCenterY);
   // drawX(leftEyeCenterX,leftEyeCenterY);

// drawX(noseTipX,noseTipY); 
//drawX(face.keypoints[332].x,face.keypoints[332].y);
//drawX(face.keypoints[103].x,face.keypoints[103].y);
//fill(255, 0, 0)
//circle(face.keypoints[4].x, face.keypoints[4].y, 30)
//drawFlower(face.keypoints[152].x,face.keypoints[152].y);





// Decide which face to draw based on mouth openness
checkIfMouthOpen(face);   // updates isMouthOpen

if (isMouthOpen) {
  image(bgImageSun, 0, 0, 1280, 960 );
} else {
image(bgImageMoon, 0, 0, 1280, 960);
}

if (isMouthOpen) {
  drawSunFace(face);
} else {
  drawMoonFace(face);
}




    /*
    Stop drawing on the face here
    */


}
}
  //------------------------------------------------------
  // You can make addtional elements here, but keep the face drawing inside the for loop. 


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

  // Add the same variable declarations here
  let faceCenterX = face.faceOval.centerX;
  let faceCenterY = face.faceOval.centerY;
  let faceWidth = face.faceOval.width;
  let faceheight = face.faceOval.height;
  let leftEyeCenterX = face.leftEye.centerX;
  let leftEyeCenterY = face.leftEye.centerY;
  let leftEyeWidth = face.leftEye.width;
  let leftEyeHeight = face.leftEye.height;
  let leftEyebrowCenterX = face.leftEyebrow.centerX;
  let leftEyebrowCenterY = face.leftEyebrow.centerY;
  let leftEyebrowWidth = face.leftEyebrow.width;
  let leftEyebrowHeight = face.leftEyebrow.height;
  let lipsCenterX = face.lips.centerX;
  let lipsCenterY = face.lips.centerY;
  let lipsWidth = face.lips.width;
  let lipsHeight = face.lips.height;
  let rightEyeCenterX = face.rightEye.centerX;
  let rightEyeCenterY = face.rightEye.centerY;
  let rightEyeWidth = face.rightEye.width;
  let rightEyeHeight = face.rightEye.height;
  let rightEyebrowCenterX = face.rightEyebrow.centerX;
  let rightEyebrowCenterY = face.rightEyebrow.centerY;
  let rightEyebrowWidth = face.rightEyebrow.width;
  let rightEyebrowHeight = face.rightEyebrow.height;
  
  // ... rest of your drawing code

  // Base moon (ellipse around the face oval)
  fill(220);
  ellipse(faceCenterX, faceCenterY, faceWidth * 1.2, faceheight * 1.2);

  // Shading (simple overlay offset to one side)
  fill(180, 180, 190, 60);
  ellipse(faceCenterX - faceWidth * 0.1, faceCenterY - faceheight * 0.05, faceWidth, faceheight);

  // Left eye
  fill(255); // white of the eye
  ellipse(leftEyeCenterX, leftEyeCenterY, leftEyeWidth * 1.2, leftEyeHeight * 1.2);
  fill(80); // pupil
  ellipse(leftEyeCenterX, leftEyeCenterY, leftEyeWidth * 0.4, leftEyeHeight * 0.4);

  // Right eye
  fill(255);
  ellipse(rightEyeCenterX, rightEyeCenterY, rightEyeWidth * 1.2, rightEyeHeight * 1.2);
  fill(80);
  ellipse(rightEyeCenterX, rightEyeCenterY, rightEyeWidth * 0.4, rightEyeHeight * 0.4);

  // Eyebrows (soft arcs above the eye centers)
  stroke(120);
  strokeWeight(2);
  noFill();
  arc(leftEyebrowCenterX, leftEyebrowCenterY, leftEyebrowWidth, leftEyebrowHeight, PI, TWO_PI);
  arc(rightEyebrowCenterX, rightEyebrowCenterY, rightEyebrowWidth, rightEyebrowHeight, PI, TWO_PI);
  noStroke();

  // Mouth (simple crater-style smile)
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
  let leftEyebrowCenterX = face.leftEyebrow.centerX;
  let leftEyebrowCenterY = face.leftEyebrow.centerY;
  let leftEyebrowWidth = face.leftEyebrow.width;
  let leftEyebrowHeight = face.leftEyebrow.height;
  let lipsCenterX = face.lips.centerX;
  let lipsCenterY = face.lips.centerY;
  let lipsWidth = face.lips.width;
  let lipsHeight = face.lips.height;
  let rightEyeCenterX = face.rightEye.centerX;
  let rightEyeCenterY = face.rightEye.centerY;
  let rightEyeWidth = face.rightEye.width;
  let rightEyeHeight = face.rightEye.height;
  let rightEyebrowCenterX = face.rightEyebrow.centerX;
  let rightEyebrowCenterY = face.rightEyebrow.centerY;
  let rightEyebrowWidth = face.rightEyebrow.width;
  let rightEyebrowHeight = face.rightEyebrow.height;
  
  // Sun body
  fill(255, 215, 0);
  ellipse(faceCenterX, faceCenterY, faceWidth * 1.3, faceHeight * 1.3);

// Rays
for (let a = 0; a < TWO_PI; a += PI / 12) {
  let r = faceWidth * 0.9;
  let innerX = faceCenterX + cos(a) * r;
  let innerY = faceCenterY + sin(a) * r;

  let tipX = faceCenterX + cos(a) * (r + 40);
  let tipY = faceCenterY + sin(a) * (r + 40);

  let leftX = faceCenterX + cos(a - 0.1) * r;
  let leftY = faceCenterY + sin(a - 0.1) * r;

  let rightX = faceCenterX + cos(a + 0.1) * r;
  let rightY = faceCenterY + sin(a + 0.1) * r;

  fill(255, 180, 0, 200);
  noStroke();
  triangle(leftX, leftY, rightX, rightY, tipX, tipY);
}

  // Eyes
  fill(255);
  ellipse(leftEyeCenterX, leftEyeCenterY, leftEyeWidth * 1.2, leftEyeHeight * 1.2);
  ellipse(rightEyeCenterX, rightEyeCenterY, rightEyeWidth * 1.2, rightEyeHeight * 1.2);

  fill(50, 50, 0);
  ellipse(leftEyeCenterX, leftEyeCenterY, leftEyeWidth * 0.4, leftEyeHeight * 0.4);
  ellipse(rightEyeCenterX, rightEyeCenterY, rightEyeWidth * 0.4, rightEyeHeight * 0.4);

  // Eyebrows
  stroke(80, 60, 0);
  strokeWeight(3);
  noFill();
  arc(leftEyebrowCenterX, leftEyebrowCenterY, leftEyebrowWidth, leftEyebrowHeight, PI, TWO_PI);
  arc(rightEyebrowCenterX, rightEyebrowCenterY, rightEyebrowWidth, rightEyebrowHeight, PI, TWO_PI);
  noStroke();

  // Mouth
  fill(255, 100, 50);
  ellipse(lipsCenterX, lipsCenterY, lipsWidth, lipsHeight * 0.6);
}

function checkIfMouthOpen(face) {
  // Lips bounding box from facemesh
  let lipsHeight = face.lips.height;
  let lipsWidth = face.lips.width;

  // Heuristic: if mouth height is more than ~45% of its width, call it open
  if (lipsHeight / lipsWidth > 0.45) {
    isMouthOpen = true;
  } else {
    isMouthOpen = false;
  }
}