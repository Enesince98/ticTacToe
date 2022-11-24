const winningArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const board = ["", "", "", "", "", "", "", "", ""];
let playersTurn = "X";
let tileElement;
let gamesCount = 0;
const winMessageElement = document.querySelector(".win-message");

//createTiles function creates a board with 9 tiles.
//It gets tile container to put it in the html
//and it can also create a filled board with content parameter.
function createTiles(tileContainer, content = "", tileClass) {
  let tiles = "";
  for (let i = 0; i < 9; i++) {
    tiles += `<div class = "${tileClass}" id = "${i}" onclick="handlePlay(this)">${
      content ? content[i] : ""
    }</div>`;
  }
  tileContainer.innerHTML += tiles;
  tileElement = document.querySelectorAll(".tile");
}
//creates board onload.
window.addEventListener("load", () =>
  createTiles(document.querySelector("section.tile-container"), "", "tile")
);

function handlePlay(element) {
  if (element.textContent) return; //if grid is already filled exit
  if (playersTurn === "X") {
    //if X plays
    element.textContent = "X"; //fill with X
    board[parseInt(element.id)] = "X"; //fill tile index on board array
    playersTurn = "O"; //players turn changes
  } else {
    element.textContent = "O";
    board[parseInt(element.id)] = "O";
    playersTurn = "X";
  }
  document.querySelector("h1").textContent = `Player ${playersTurn} plays`;
  checkBoard();
}

function checkBoard() {
  const win = checkWin();
  if (win) {
    for (let tile of win) {
      tileElement[tile].classList.add("winning-tile");
    }
    createOldGame();
    return winningMessage(board[checkWin()[0]]);
  }
  if (board.filter(Boolean).length === 9) return winningMessage();
}

function checkWin() {
  return winningArray.find((winCondition) => {
    return (
      board[winCondition[0]] &&
      board[winCondition[1]] &&
      board[winCondition[2]] &&
      board[winCondition[0]] === board[winCondition[1]] &&
      board[winCondition[1]] === board[winCondition[2]] &&
      board[winCondition[0]] === board[winCondition[2]]
    );
  });
}

function winningMessage(player = "") {
  winMessageElement.style.height = "4rem";
  winMessageElement.textContent = player ? `Player ${player} wins!` : "TIE!";
}
function resetBoard() {
  tileElement.forEach((tile) => {
    tile.textContent = "";
    tile.classList.remove("winning-tile");
  });
  board.fill("");
}
function createOldGame() {
  gamesCount++;
  document.querySelector(
    "section.old-games"
  ).innerHTML += `<div class = 'old-game${gamesCount}'><div>`;
  document.querySelector(`div.old-game${gamesCount}`).innerHTML = "";
  createTiles(
    document.querySelector(`div.old-game${gamesCount}`),
    board,
    "tile-old-games"
  );
}
