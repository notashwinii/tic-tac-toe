// Select all boxes
let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;

// Initial event listeners setup
boxes.forEach(box => {
    box.innerHTML = "";
    box.addEventListener("click", () => {
        // Only allow move if game is not over and box is empty
        if (!isGameOver && box.innerHTML === "") {
            box.innerHTML = turn;
            checkWin();
            if (!isGameOver) {
                checkDraw();
                changeTurn();
            }
        }
    });
});

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg")?.style.left = "85px"; // Optional chaining to prevent errors if .bg doesn't exist
    } else {
        turn = "X";
        document.querySelector(".bg")?.style.left = "0"; // Optional chaining
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical
        [0, 4, 8], [2, 4, 6]  // Diagonal
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        const v0 = boxes[a].innerHTML;
        const v1 = boxes[b].innerHTML;
        const v2 = boxes[c].innerHTML;

        // Check if all three boxes are non-empty and match
        if (v0 && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").textContent = `${turn} Wins!`;
            document.querySelector("#play-again").style.display = "inline";
            
            // Highlight winning boxes
            condition.forEach(index => {
                boxes[index].style.backgroundColor = "#08D9D6";
                boxes[index].style.color = "#000";
            });
            return true; // Explicitly return to indicate a win
        }
    }
    return false; // No win detected
}

function checkDraw() {
    // Only check for draw if game is not over
    if (!isGameOver) {
        const isDraw = Array.from(boxes).every(box => box.innerHTML !== "");
        
        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").textContent = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

// Play Again button event listener
document.querySelector("#play-again").addEventListener("click", resetGame);

function resetGame() {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg")?.style.left = "0"; // Optional chaining
    document.querySelector("#results").textContent = "";
    document.querySelector("#play-again").style.display = "none";
    
    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.backgroundColor = ""; // More standard way to reset background
        box.style.color = "#fff";
    });
}
