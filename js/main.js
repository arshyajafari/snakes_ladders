$(function () {
  // dynamic data
  let playerTurn = 0,
    position = 0,
    hasWon = false,
    row = [],
    tiles = [];

  let cols = 10;
  let rows = 10;

  // static data
  const players = [
      { name: "Player 1", position: 0, color: "rgb(255, 193, 21)" },
      { name: "Player 2", position: 0, color: "rgb(158, 72, 45)" },
    ],
    ladders = [
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
    ],
    snakes = [
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

  // let image = document.querySelector(".board-image");
  // let width = image.width / rows;
  // let height = image.height / cols;

  // for (let j = 0; j < cols; j++) {
  //   row.push(tiles);
  //   for (let i = 0; i < rows; i++) {
  //     let x = i * width;
  //     let y = j * height;

  //     tiles.push({ x, y, i, j, position });
  //     position++;
  //   }
  // }

  // $.fn.drawBoard = function () {
  //   let piece = ``;
  //   players.forEach((player) => {
  //     row.forEach((tiles) => {
  //       tiles.forEach((tile) => {
  //         if (tile.position === player.position) {
  //           if (tile.j % 2 == 0) {
  //             piece += `<div class="piece" style="background-color: ${
  //               player.color
  //             }; bottom: ${tile.y + 15}px; left: ${tile.x + 10}px"}></div>`;
  //           } else {
  //             piece += `<div class="piece" style="background-color: ${
  //               player.color
  //             }; bottom: ${tile.y + 15}px; right: ${tile.x + 10}px"}></div>`;
  //           }
  //         }
  //       });
  //     });
  //   });
  //   document.querySelector(".pieces").innerHTML = piece;
  // };

  $(".dice").attr("dice-content", "Roll the Dice");
  $(".dice").click(function () {
    if (hasWon) return;

    let currentPlayer = players[playerTurn];

    let rollDice = Math.floor(Math.random() * 6) + 1;

    $(this).attr("dice-content", rollDice);
    $(this).css("font-size", "1.25rem");

    currentPlayer.position += rollDice;

    ladders.map((item) => {
      if (item.start === currentPlayer.position) {
        currentPlayer.position = item.end;

        $(".alert-modal").css("visibility", "visible");
        $(".alert-message").html("Oh man, you climbed the ladder.");
        setTimeout(() => {
          $(".alert-modal").css("visibility", "hidden");
        }, 3000);
      }
    });

    snakes.map((item) => {
      if (item.start === currentPlayer.position) {
        currentPlayer.position = item.end;

        $(".alert-modal").css("visibility", "visible");
        $(".alert-message").html("Wow, the snake bit you.");
        setTimeout(() => {
          $(".alert-modal").css("visibility", "hidden");
        }, 3000);
      }
    });

    if (currentPlayer.position > 99) {
      $(".alert-modal").css("visibility", "visible");
      $(".alert-message").html(`${currentPlayer.name} has won.`);
      hasWon = true;
      setTimeout(() => {
        location.reload();
      }, 3000);
    }

    rollDice === 6 ? playerTurn : playerTurn++;

    if (playerTurn >= players.length) playerTurn = 0;

    if (playerTurn === 0) {
      $(".player-name").html("Player 1");
      $(".player-dote").css("background-color", "rgb(4, 233, 4)");
      $(".player-dote").css(
        "box-shadow",
        "0px 0px 7px 3px rgba(4, 233, 4, 0.925)"
      );
    } else {
      $(".player-name").html("Player 2");
      $(".player-dote").css("background-color", "rgb(255, 79, 35)");
      $(".player-dote").css(
        "box-shadow",
        "0px 0px 7px 3px rgba(255, 79, 35, 0.925)"
      );
    }

    // $(".game-box").drawBoard();
  });
});
