const listImages = [
  "boo.png",
  "star.png",
  "luma.png",
  "mushroom.png",
  "shell.png",
  "goomba.png",
  "chainchomp.png"
];

export function getRandomListImages(numberImages) {
  
  let randomList = [];

  if(numberImages < 2 || numberImages > listImages.length) {
    console.error("Parameter 'numberImages' on getRandomlist is too lower or too high");
  }

  while(randomList.length < numberImages) {
    let chooseImage = listImages[Math.floor(Math.random()*listImages.length)];
    if(randomList.indexOf(chooseImage) === -1){
      randomList.push(chooseImage);
    }
  }

  return randomList;
}
