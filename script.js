


function checkDraw(){
    if(!isGameOver){
        let isDraw = true;
        boxes.forEach(e =>{
            if(e.innerHTML === "") isDraw = false;
        })

        if(isDraw){
            isGameOver =true;
            document.querySelector("#results").innerHTML= "Draw";
            document.querySelector("#play-again").style.display= "inline"
        }
    }
}

document.querySelector("#play-again").addEventListener("click", ()=>{isGameOver = false;
    turn ="X";
    document.querySelector(".bg").style.left ="0";
    document.querySelector("#results").innerHTML ="";
    document.querySelector("#play-again").style.display ="none";

    boxes.forEach(e =>{
        e.innerHTML ="";
        e.style.removeProperty("background-color");
        e.style.color ="#fff"
    })

})