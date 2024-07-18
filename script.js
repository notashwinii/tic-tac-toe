let boxes = document.querySelectorAll(".box");

let turn = "X";
let isGameOver = false;

boxes.forEach(box => {
    box.innerHTML = "";
    box.addEventListener("click", () => {
        if (!isGameOver && box.innerHTML === "") {
            box.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px"; // Assuming .bg exists and is styled correctly elsewhere
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0"; // Assuming .bg exists and is styled correctly elsewhere
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
        const v0 = boxes[winConditions[i][0]].innerHTML;
        const v1 = boxes[winConditions[i][1]].innerHTML;
        const v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " Wins!";
            document.querySelector("#play-again").style.display = "inline";

            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winConditions[i][j]].style.color = "#000";
            }

            return; // Exit the function once a win is detected
        }
    }
}

function checkDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(box => {
            if (box.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0"; // Assuming .bg exists and is styled correctly elsewhere
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.removeProperty("background-color"); // Correct way to remove styles
        box.style.color = "#fff";
    });
});
