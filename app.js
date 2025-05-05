let gameSeq = [];
let userSeq = [];

let btns = ['yellow', 'red', 'purple', 'green'];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;

        levelup();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash")
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randClr = btns[randIdx];
    let randbtn = document.querySelector(`.${randClr}`);
    gameSeq.push(randClr);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns(idx) {
    if(userSeq[idx] == gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelup,1000);
        }
    }
    else {
        if(level == -1) {
            h2.innerHTML = `Game over! Your score was <b>${level+1}</b><br>Press any key to start again`;
        } else if (level == 0){
            h2.innerHTML = `Game over! Your score was <b>${level}</b><br>Press any key to start again`;
        } else {
            h2.innerHTML = `Game over! Your score was <b>${level-1}</b><br>Press any key to start again`;
        }
        document.querySelector("body").style.backgroundColor = 'rgb(254, 107, 107)';
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = 'rgb(227, 227, 255)';
        }, 150);
        highscore();
        reset();
    }
}

let gamescore = document.querySelector(".high-score");
let maxlevel = 0;
function highscore() {
    if(level>maxlevel) {
        gamescore.innerText = `${level-1}`;
        gamescore = level;
    } else {
        gamescore.innerText = `${maxlevel}`;
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;   
}
