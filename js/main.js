$(function () {
  // dynamic data
  let playerTurn = 0,
    position = 0,
    hasWon = false,
    rows = [],
    tiles = [];

  // static data
  const players = [
      { name: "", position: 0, color: "rgb(255, 193, 21)" },
      { name: "", position: 0, color: "rgb(158, 72, 45)" },
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

  $("#submit").click((e) => {
    e.preventDefault();

    let playerOne = $("#playerOne").val().trim().replace(/\s/g, "");
    let playerTwo = $("#playerTwo").val().trim().replace(/\s/g, "");

    if (!playerOne || !playerTwo) return;

    $(".prompt-modal").css("visibility", "hidden");

    players[0].name = playerOne;
    players[1].name = playerTwo;

    $("#playerOne").val("");
    $("#playerTwo").val("");
  });

  // const image = $(".board-image");
  // let width = image[0].width / 10,
  //   height = image[0].height / 10;

  // for (let j = 0; j < 10; j++) {
  //   rows.push(tiles);
  //   for (let i = 0; i < 10; i++) {
  //     let x = i * width;
  //     let y = j * height;

  //     tiles.push({ x, y, i, j, position });
  //     position++;
  //   }
  // }

  // $.fn.drawBoard = function () {
  //   players.map((player) => {
  //     rows.map((tiles) => {
  //       tiles.map((tile) => {
  //         if (tile.position === player.position) {
  //           if (tile.j % 2 === 0) {
  //             if (playerTurn === 0) {
  //               $(".player-one-piece-high").css("bottom", `${tile.y + 12}px`);
  //               $(".player-one-piece-high").css("left", `${tile.x + 8}px`);
  //             } else {
  //               $(".player-two-piece-high").css("bottom", `${tile.y + 12}px`);
  //               $(".player-two-piece-high").css("left", `${tile.x + 8}px`);
  //             }
  //           } else {
  //             if (playerTurn === 0) {
  //               $(".player-one-piece-high").css("bottom", `${tile.y + 12}px`);
  //               $(".player-one-piece-high").css("right", `${tile.x + 8}px`);
  //             } else {
  //               $(".player-two-piece-high").css("bottom", `${tile.y + 12}px`);
  //               $(".player-two-piece-high").css("right", `${tile.x + 8}px`);
  //             }
  //           }
  //         }
  //       });
  //     });
  //   });
  // };

  $(".dice").attr("dice-content", "Roll the Dice");
  $(".dice").click(() => {
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
      $(".player-name").html(players[0].name);
      $(".player-dote").css("background-color", "rgb(4, 233, 4)");
      $(".player-dote").css(
        "box-shadow",
        "0px 0px 7px 3px rgba(4, 233, 4, 0.925)"
      );
    } else {
      $(".player-name").html(players[1].name);
      $(".player-dote").css("background-color", "rgb(255, 79, 35)");
      $(".player-dote").css(
        "box-shadow",
        "0px 0px 7px 3px rgba(255, 79, 35, 0.925)"
      );
    }

    $(".game-box").drawBoard();
  });
});
