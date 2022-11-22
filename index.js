const winningArray=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]];
let board = [
    "","","",
    "","","",
    "","",""];
let playersTurn = 0;

function handlePlay(element){
    if(!element.textContent )
        {playersTurn ? element.textContent = "X" : element.textContent = "O";
        board[parseInt(element.id)] = playersTurn ? 1:-1;
        playersTurn = !playersTurn;
        console.log(board);
        checkBoard(element);
    }
}
function checkBoard(element){
    playerX = [];
    playerO = [];
    for (let i = 0; i < board.length; i++){
        if (board[i] == 1)
            playerX.push(i);

        if (board[i] == -1)
            playerO.push(i);
    }
    console.log(playerX);
    if (playerX.length >= 3) {checkWin(playerX, "X") ? winningMessage("X") : null};
    if (playerO.length >= 3) {checkWin(playerO, "O") ? winningMessage("O") : null};
    if (playerO.length + playerX.length === 9) winningMessage("No one");
}

function checkWin(array, player){
    console.log(array)
    return winningArray.some(item => {
        equal = 0
        for (const value of array){
            item.includes(value) ? equal ++ : null;
        }
        return equal === 3 ? true:false;
    }) ? true: false;
}

function winningMessage(player){
    document.querySelector(".win-message").style.height ="4rem";
    document.querySelector(".win-message").textContent = `Player ${player} wins!`
    resetter();
}
function resetter(){
    document.querySelectorAll(".tile").forEach((tile) => tile.textContent="")
    board = ["","","","","","","","",""];
}