const X_IMAGE_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj_yQ0NQzFl6NLfe84CmEX2I-CjP6r6soeLA&usqp=CAU';
const O_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/2/2d/O-Jolle_insigna.png';

function assignSpace(space, owner) {
  const image = document.createElement('img');
  image.src = owner === 'x' ? X_IMAGE_URL : O_IMAGE_URL;
  space.appendChild(image);
  const index = parseInt(space.dataset.index);
  takenBoxes[index] = owner;
  const indexToRemove = freeBoxes.indexOf(space);
  freeBoxes.splice(indexToRemove, 1);
  space.removeEventListener('click', changeToX);
}

function changeToX(event) {
  assignSpace(event.currentTarget, 'x');
  if (isGameOver()) {
    displayWinner();
  } else {
    computerChooseO();
  }
}

function computerChooseO() {
  const allBoxes  = document.querySelectorAll('#grid div');
  const index = Math.floor(Math.random() * freeBoxes.length);
  const freeSpace = freeBoxes[index];
  assignSpace(freeSpace, 'o');
  if (isGameOver()) {
    displayWinner();
  }
}

function isGameOver() {
  return freeBoxes.length === 0 || getWinner() !== null;
}

function displayWinner() {
  const winner = getWinner();
  const resultContainer = document.querySelector('#results');
  const header = document.createElement('h1');
  if (winner === 'x') {
    header.textContent = 'คุณชนะ!';
  } else if (winner === 'o') {
    header.textContent = 'คอมพิวเตอร์ชนะ!';
  } else {
    header.textContent = 'เสมอ';
  }
  resultContainer.appendChild(header);
  for (const box of freeBoxes) {
    box.removeEventListener('click', changeToX);
  }
}

function checkBoxes(one, two, three) {
  if (takenBoxes[one] !== undefined &&
      takenBoxes[one] === takenBoxes[two] &&
      takenBoxes[two] === takenBoxes[three]) {
    return takenBoxes[one];
  }
  return null;
}

function getWinner() {
  for (let col = 0; col < 3; col++) {
    const offset = col * 3;
    // Check rows and columns.
    let result = checkBoxes(offset, 1 + offset, 2 + offset) ||
        checkBoxes(col, 3 + col, 6 + col);
    if (result) {
      return result;
    }
  }
  return checkBoxes(0, 4, 8) || checkBoxes(2, 4, 6);
}

const freeBoxes = [];
const takenBoxes = {};
const boxes = document.querySelectorAll('#grid div');
for (const box of boxes) {
  box.addEventListener('click', changeToX);
  freeBoxes.push(box);
}