$(function () {
  let playerTurn = 0;
  let position = 1;

  let hasWon = false;

  let players = [
    { name: "Player one", position: 1, color: "rgb(255, 193, 21)" },
    { name: "Player two", position: 1, color: "rgb(158, 72, 45)" },
  ];
  let ladders = [
    { start: 2, end: 38 },
    { start: 7, end: 14 },
    { start: 8, end: 31 },
    { start: 15, end: 26 },
    { start: 21, end: 42 },
    { start: 28, end: 84 },
    { start: 36, end: 44 },
    { start: 51, end: 67 },
    { start: 71, end: 91 },
    { start: 78, end: 98 },
    { start: 87, end: 94 },
  ];
  let snakes = [
    { start: 16, end: 6 },
    { start: 46, end: 25 },
    { start: 49, end: 11 },
    { start: 62, end: 19 },
    { start: 64, end: 60 },
    { start: 74, end: 53 },
    { start: 89, end: 68 },
    { start: 92, end: 88 },
    { start: 95, end: 75 },
    { start: 99, end: 80 },
  ];

  let row = [];
  let tiles = [];

  let cols = 10;
  let rows = 10;

  let image = document.querySelector(".board-image");
  let width = image.width / rows;
  let height = image.height / cols;

  for (let j = 0; j < cols; j++) {
    row.push(tiles);
    for (let i = 0; i < rows; i++) {
      let x = i * width;
      let y = j * height;

      tiles.push({ x, y, i, j, position });
      position++;
    }
  }

  $.fn.drawBoard = function () {
    let piece = ``;
    players.forEach((player) => {
      row.forEach((tiles) => {
        tiles.forEach((tile) => {
          if (tile.position === player.position) {
            if (tile.j % 2 == 0) {
              piece += `<div class="piece" style="background-color: ${
                player.color
              }; bottom: ${tile.y + 15}px; left: ${tile.x + 10}px"}></div>`;
            } else {
              piece += `<div class="piece" style="background-color: ${
                player.color
              }; bottom: ${tile.y + 15}px; right: ${tile.x + 10}px"}></div>`;
            }
          }
        });
      });
    });
    document.querySelector(".pieces").innerHTML = piece;
  };

  $(".dice-image").click(function () {
    if (hasWon) {
      return;
    }

    let currentPlayer = players[playerTurn];

    let rollDice = Math.floor(Math.random() * 6) + 1;

    $(this).attr("src", `./img/dice${rollDice}.png`);

    currentPlayer.position += rollDice;

    ladders.forEach((ladder) => {
      if (ladder.start === currentPlayer.position) {
        currentPlayer.position = ladder.end;

        $(".player-turn").html("yes");
      }
    });

    snakes.forEach((snake) => {
      if (snake.start === currentPlayer.position) {
        currentPlayer.position = snake.end;

        $(".player-turn").html("oh, nop");
      }
    });

    if (currentPlayer.position > 99) {
      $(".game-result").html(`${currentPlayer.name} has won.`);
      hasWon = true;
    }

    rollDice == 6 ? playerTurn : playerTurn++;

    if (playerTurn >= players.length) {
      playerTurn = 0;
    }

    if (playerTurn == 0) {
      $(".player-turn").html("player one turn");
      $(".player-turn").css("color", "rgb(123, 255, 0)");
    } else {
      $(".player-turn").html("player two turn");
      $(".player-turn").css("color", "rgb(11, 139, 179)");
    }

    $(".game-box").drawBoard();
  });
});
