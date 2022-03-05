"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");

const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// starting condition

score0El.textContent = 0;
score1El.textContent = 0;

// Starting일때 주사위 안 보이게
diceEl.classList.add("hidden");

// 점수 기록
// player 0,1 점수를 배열로 기록;
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

////// function

// 플레이어 교체 function
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
};

// 처음으로 초기화
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");

    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");

    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
};

// Roll 버튼 눌렀을때
btnRoll.addEventListener("click", function () {
    if (playing) {
        // 1. 주사위 굴리기
        // 던질때마다 다르게 나와야해서 전역함수 말고 여기 넣어야된다.
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2. 나온 값 보여주기
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;

        // 3. 주사위 숫자 1 기준으로 분기행동
        if (dice !== 1) {
            //현재 주사위 점수를 종합점수에 추가
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

// Hold 버튼 눌렀을때
btnHold.addEventListener("click", function () {
    if (playing) {
        //1. 현재 점수를 액티브 플레이어 점수에 넣는다.
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //2. 만약 플레이어 총점 100점이 넘으면 게임 끝낸다.
        //3. 100점 안되면 스위치 플레이어
        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        } else {
            switchPlayer();
        }
    }
});

// 초기화 버튼
btnNew.addEventListener("click", init);
