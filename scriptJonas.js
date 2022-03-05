"use strict";

////// Selectin Elements
// querySelector로 #쓰나 getElementById 2개 다 동일하게 작동함
// 데이터가 많을 경우 getElemntById가 조금 더 빠르다는데 Jonas는 걍 쿼리셀렉터 선호
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");

const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

////// Starting Conditions

// Score 0  점으로 초기화
score0El.textContent = 0;
score1El.textContent = 0;

// 스타팅일때 주사위 안보이게 하는거
diceEl.classList.add("hidden");

// 점수 기록
// 플레이어 0, 1 점수를 배열로 저장

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

////// function

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1El.classList.toggle("player--active");
    player0El.classList.toggle("player--active");
};

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
init();

////// Playing Game

// Roll Dice 버튼 눌렀을때 기능 작동
btnRoll.addEventListener("click", function () {
    if (playing) {
        //1.주사위 굴리기
        //던질떄마다 다르게 나와야해서 전역함수 말고 여기에 넣어야
        const dice = Math.trunc(Math.random() * 6) + 1;
        //2.나온값 주사위에 디스플레이
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;

        //3.주사위 숫자 1 기준으로 분기행동
        if (dice !== 1) {
            // 현재 주사위 숫자 점수에 추가
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // 플레이어 전환
            switchPlayer();
        }
    }
});

// Hold 버튼 눌렀을때 작동

btnHold.addEventListener("click", function () {
    if (playing) {
        // 1. 현재 점수를 액티브 플레이어 점수에 넣는다
        scores[activePlayer] += currentScore;
        document.getElementById(`current--${activePlayer}`).textContent = scores[activePlayer];

        // 2. 만약 플레이어 총점이 100점이면 게임을 끝낸다
        // 3. 100점 안되면 상대한테 넘긴다
        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        } else {
            switchPlayer();
        }
    }
});

// new게임 버튼 눌렀을떄 작동

////////// 이거 강의 안보고 self try로 만든거 시작

// btnNew.addEventListener("click", function () {
//     //1. 게임 상태 리셋
//     playing = true;
//     currentScore = 0;
//     scores[0] = 0;
//     scores[1] = 0;
//     //2. current 0점으로 만든다.
//     document.getElementById(`current--0`).textContent = currentScore;
//     document.getElementById(`current--1`).textContent = currentScore;
//     //3. total 점수 0점으로 만든다.
//     document.getElementById(`score--0`).textContent = scores[0];
//     document.getElementById(`score--1`).textContent = scores[1];
//     //4. 1번 플레이어가 잡는걸로 바꾼다.
//     activePlayer = 0;
//     player0El.classList.add("player--active");
//     player1El.classList.remove("player--active");
//     //5. 위너 플레이어 있던 상태일수 있으니 그것도 아예 리셋
//     player0El.classList.remove("player--winner");
//     player1El.classList.remove("player--winner");
// });

////////// 이거 강의 안보고 self try로 만든거 끝

////////// 강의 내용 시작

btnNew.addEventListener("click", function () {
    // 이걸 함수로 따로 만들
    // score0El.textContent = 0;
    // score1El.textContent = 0;
    // current0El.textContent = 0;
    // current1El.textContent = 0;
    // player0El.classList.remove("player--winner");
    // player1El.classList.remove("player--winner");
    // player0El.classList.add("player--active");
    // player0El.classList.remove("player--active");
    init();
});
