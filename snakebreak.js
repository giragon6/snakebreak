#!/usr/bin/env node

require("readline").emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const { exec } = require("child_process");

const args = process.argv.slice(2);
const fileName = args[0];

const config = require("./config.json");

const SPLNEWLINE = config.splitOnNewline;
const NUM_LINES = config.linesPerScreen;
const STEP = config.step;
const SNAKECHAR = config.snakeCharacter.charAt(0);
const FOODCHAR = config.foodCharacter.charAt(0);
const SPACECHAR = config.spaceCharacter.charAt(0);

const CONTROLS = "W - ↑ | A - ← | S - ↓ | D - → | E - EXIT";

function playSnake(err) {
  const width = 20;
  const height = 10;
  const errMsg = SPLNEWLINE
    ? err.toString().split(/(\n\S+)/)
    : err
        .toString()
        .split(/(\s\s+)|\s+/)
        .filter((i) => i);

  let snake = [{ x: 2, y: 2 }];
  let direction = { x: 1, y: 0 };
  let food = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
  };
  let score = 0;

  const draw = () => {
    let board = "";
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (snake.some((segment) => segment.x === x && segment.y === y)) {
          board += SNAKECHAR;
        } else if (food.x === x && food.y === y) {
          board += FOODCHAR;
        } else {
          board += SPACECHAR;
        }
      }
      board += "\n";
    }
    console.clear();
    // console.log(errMsg)
    console.log(board);
    console.log(CONTROLS);
    console.log("\n");
    // console.log(`Score: ${score}`);
    console.log(errMsg.slice(Math.max(score * STEP - NUM_LINES, 0), score * STEP).join(" "));
  };

  const update = () => {
    let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (
      head.x < 0 ||
      head.x >= width ||
      head.y < 0 ||
      head.y >= height ||
      snake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      score = 0;
      snake = [{ x: 2, y: 2 }];
      direction = { x: 1, y: 0 };
      head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score++;
      console.log(score);
      console.log(errMsg.length);
      if (score == errMsg.length) {
        // Error has finished printing
        console.clear();
        console.log(err);
        process.exit();
      }
      food = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
      };
    } else {
      snake.pop();
    }
  };

  const gameLoop = () => {
    update();
    draw();
    setTimeout(gameLoop, 200);
  };

  process.stdin.on("keypress", (char, evt) => {
    switch (char) {
      case "w":
        if (direction.y === 0) direction = { x: 0, y: -1 };
        break;
      case "s":
        if (direction.y === 0) direction = { x: 0, y: 1 };
        break;
      case "a":
        if (direction.x === 0) direction = { x: -1, y: 0 };
        break;
      case "d":
        if (direction.x === 0) direction = { x: 1, y: 0 };
        break;
      case "e":
        process.exit();
    }
  });

  gameLoop();
}

exec(`node ${fileName}`, (error, stdout, stderr) => {
  if (error || stderr) {
    playSnake(error || stderr);
  } else {
    console.log(stdout);
  }
});
