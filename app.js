"use strict";

const $form = document.querySelector("#form");
const $input = document.querySelector("#input");
const $logs = document.querySelector("#logs");

const numbers = [];
for (let n = 0; n < 9; n++) {
  numbers.push(n + 1);
}

// Array(9).fill(0).map((el, idx) => {
//   return idx + 1;
// })

const answer = [];
for (let n = 0; n < 4; n++) {
  const index = Math.floor(Math.random() * numbers.length);
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}
console.log(answer);

const tries = [];
function checkInput(input) {
  if (input.length !== 4) {
    return alert("4자리 숫자를 입력해 주세요.");
  }
  if (new Set(input).size !== 4) {
    return alert("중복되지 않게 입력해 주세요.");
  }
  if (tries.includes(input)) {
    return alert("이미 시도한 값입니다");
  }
  return true;
}

function defeated() {
  $logs.appendChild(document.createTextNode(`패배! 정답은 ${answer.join("")}`));
}

let out = 0;
$form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = $input.value;
  $input.value = ""; // 글자 지워줘
  if (!checkInput(value)) {
    return;
  }
  if (answer.join("") === value) {
    $logs.textContent = "홈런!";
    return;
  }
  if (tries.length >= 9) {
    defeated();
    return;
  }

  let strike = 0;
  let ball = 0;
  // 예 answer: 3146 value 1234
  answer.forEach((element, i) => {
    const index = value.indexOf(element);
    if (index > -1) {
      if (index === i) {
        strike += 1;
      } else {
        ball += 1;
      }
    }
  });
  if (strike === 0 && ball === 0) {
    out++;
    $logs.append(`${value}: 아웃`, document.createElement("br"));
  } else {
    $logs.append(
      `${value}: ${strike} 스트라이크 ${ball} 볼`,
      document.createElement("br")
    );
  }
  if (out === 3) {
    defeated();
    return;
  }
  tries.push(value);
});
