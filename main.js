let level = document.querySelector(".message .level");
let seconds = document.querySelector(".message .seconds");
let start = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWord = document.querySelector(".upcoming-word");
let time = document.querySelector(".time span");
let got = document.querySelector(".got");
let total = document.querySelector(".total");
let finish = document.querySelector(".finish");
let select = document.querySelector(".select");
let inputName = document.querySelector(".user");
let lvl = document.querySelector(".lvl");
let size = document.querySelector(".size");
let t = document.querySelector(".t");
let instruction = document.querySelector(".instruction");
let reload = document.querySelector("button");

reload.onclick = function () {
  location.reload();
};

let his = [];
if (localStorage.getItem("score")) {
  his = JSON.parse(localStorage.getItem("score"));
}
if (localStorage.getItem("level")) {
  select.value = localStorage.getItem("level");
}

let stack = [];
let hardProgrammingWords = [
  "abstraction",
  "asynchronous",
  "concurrency",
  "decomposition",
  "encapsulation",
  "immutable",
  "inheritance",
  "middleware",
  "polymorphism",
  "refactoring",
  "serialization",
  "synchronous",
  "transpiler",
  "abstraction",
  "algorithm",
  "authentication",
  "backtracking",
  "big-O notation",
  "binary tree",
  "bitwise operator",
  "closure",
  "compilation",
  "data structure",
  "debugging",
  "exception handling",
  "finite state machine",
  "functional programming",
  "garbage collection",
  "hashing",
  "heuristic",
  "documentation",
];

let normalProgrammingWords = [
  "API",
  "array",
  "boolean",
  "class",
  "component",
  "letructor",
  "database",
  "debug",
  "DOM",
  "event",
  "function",
  "HTML",
  "HTTP",
  "IDE",
  "JSON",
  "library",
  "loop",
  "method",
  "module",
  "object",
  "parameter",
  "query",
  "recursion",
  "script",
  "variable",
  "programming",
  "algorithm",
  "application",
  "conditional",
];

let easyProgrammingWords = [
  "code",
  "computer",
  "developer",
  "server",
  "stack",
  "syntax",
  "engineer",
  "frontend",
  "backend",
  "software",
  "data",
  "function",
  "method",
  "network",
  "system",
  "database",
  "server",
  "client",
  "file",
  "security",
  "test",
  "debug",
  "interface",
  "website",
  "API",
  "variable",
  "loop",
];

input.onkeyup = function (e) {
  if (e.key == "Enter") {
    time.innerHTML = "1";
  } else if (e.key == theWord.innerHTML[0]) {
    let myWord = "";
    for (let i = 1; i < theWord.innerHTML.length; i++) {
      myWord += theWord.innerHTML[i];
    }
    theWord.innerHTML = myWord;
  }
};

inputName.onkeyup = function (e) {
  if (e.key == "Enter") {
    start.click();
  }
};

window.onload = function () {
  inputName.focus();
};

let lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

levelOfWords();
let defaultLevelName = select.value;
let defaultLevelSeconds = lvls[defaultLevelName];
level.innerHTML = defaultLevelName;
seconds.innerHTML = defaultLevelSeconds;
time.innerHTML = defaultLevelSeconds;
total.innerHTML = stack.length;
lvl.innerHTML = defaultLevelName;
size.innerHTML = stack.length;
t.innerHTML = defaultLevelSeconds;

select.onchange = function () {
  levelOfWords();
  localStorage.setItem("level", select.value);
  defaultLevelName = select.value;
  defaultLevelSeconds = lvls[defaultLevelName];
  level.innerHTML = defaultLevelName;
  seconds.innerHTML = defaultLevelSeconds;
  time.innerHTML = defaultLevelSeconds;
  total.innerHTML = stack.length;
  lvl.innerHTML = defaultLevelName;
  size.innerHTML = stack.length;
  t.innerHTML = defaultLevelSeconds;
};

input.onpaste = function () {
  return false;
};

start.onclick = function () {
  if (inputName.value != "") {
    start.remove();
    inputName.remove();
    instruction.remove();
    select.remove();
    input.focus();
    generateWord();
  } else {
    alert("Please Enter Your Name");
  }
};

function generateWord() {
  let randomWord = stack[Math.floor(Math.random() * stack.length)];
  let index = stack.indexOf(randomWord);
  stack.splice(index, 1);
  theWord.innerHTML = randomWord;
  upcomingWord.innerHTML = "";
  for (let i = 0; i < stack.length; i++) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(stack[i]));
    upcomingWord.appendChild(div);
  }
  startPlay(randomWord);
}

let flag = true;

function startPlay(randomWord) {
  if (flag) {
    time.innerHTML = defaultLevelSeconds + 3;
    flag = false;
  } else {
    time.innerHTML = defaultLevelSeconds;
  }
  let start = setInterval(() => {
    time.innerHTML--;
    if (time.innerHTML == "0") {
      clearInterval(start);
      check(randomWord);
    }
  }, 1000);
}

function result(state) {
  let msg;
  if (state == "win") {
    state = "good";
    msg = "You Win";
  } else if (state == "lose") {
    state = "bad";
    msg = "Game Over";
  }
  let span = document.createElement("div");
  span.classList.add(state);
  span.appendChild(document.createTextNode(msg));
  finish.appendChild(span);
  let score = document.createElement("div");
  score.classList.add("userMsg");
  score.appendChild(
    document.createTextNode(`You Got ${got.innerHTML} form ${total.innerHTML}`)
  );
  finish.appendChild(score);
  upcomingWord.remove();
}

function addtolocalStorage() {
  let currentDate = new Date();
  let formattedDate = currentDate.toISOString().split()[0];
  let score = {
    name: inputName.value,
    score: got.innerHTML,
    total: total.innerHTML,
    level: level.innerHTML,
    date: formattedDate,
  };
  his.push(score);
  localStorage.setItem("score", JSON.stringify(his));
}

function check(randomWord) {
  if (input.value.toLowerCase() == randomWord.toLowerCase()) {
    input.value = "";
    got.innerHTML++;
    if (stack.length > 0) {
      generateWord();
    } else {
      result("win");
      addtolocalStorage();
    }
  } else {
    result("lose");
    addtolocalStorage();
  }
}

function levelOfWords() {
  switch (select.value) {
    case "Easy":
      stack = easyProgrammingWords;
      break;
    case "Normal":
      stack = normalProgrammingWords;
      break;
    case "Hard":
      stack = hardProgrammingWords;
  }
}
