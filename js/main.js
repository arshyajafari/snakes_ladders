$(function () {
  // dynamic data
  let playerTurn = 0,
    hasWon = false;

  // static data
  const players = [
    { name: "", position: 0, pre_position: 0, color: "rgb(255, 193, 21)" },
    { name: "", position: 0, pre_position: 0, color: "rgb(158, 72, 45)" },
  ];

  // game rules
  const ladders = [
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

  // welcome message and get players name
  $(".alert-modal").css("visibility", "visible");
  $(".alert-message").html(
    "Welcome to snakes and ladders game, please enter your name first."
  );
  $(".prompt-modal").css("visibility", "hidden");
  setTimeout(() => {
    $(".alert-modal").css("visibility", "hidden");
    $(".prompt-modal").css("visibility", "visible");
  }, 3500);

  // get players name method
  $("#submit").click((e) => {
    e.preventDefault();

    let playerOne = $("#playerOne").val().trim();
    let playerTwo = $("#playerTwo").val().trim();

    if (!playerOne || !playerTwo) return;

    $(".prompt-modal").css("visibility", "hidden");

    players[0].name = playerOne;
    players[1].name = playerTwo;

    $("#playerOne").val("");
    $("#playerTwo").val("");

    $(".player-name").html(players[0].name);
    $(".player-dote").css("display", "block");
  });

  // board game method
  $.fn.boardGame = function (player) {
    const tdTbl = $("td");

    const playerOnePiece = `
      <span class="player-one-piece-high">
        <span class="player-one-piece-mid">
          <span class="player-one-piece-low"></span>
        </span>
      </span>`;
    const playerTwoPiece = `
      <span class="player-two-piece-high">
        <span class="player-two-piece-mid">
          <span class="player-two-piece-low"></span>
        </span>
      </span>`;

    for (let i = tdTbl.length - 1; i >= 0; i--) {
      if (playerTurn === 0) {
        if (+tdTbl[i].getAttribute("data-index") === player.position) {
          $(tdTbl[i]).html(playerOnePiece);
        }
        if (+tdTbl[i].getAttribute("data-index") === player.pre_position) {
          $(tdTbl[i]).html("");
        }
        if (
          players[0].pre_position === players[1].position &&
          +tdTbl[i].getAttribute("data-index") === players[1].position
        ) {
          $(tdTbl[i]).html(playerTwoPiece);
        }
        if (
          players[0].position === players[1].position &&
          +tdTbl[i].getAttribute("data-index") === players[0].position &&
          +tdTbl[i].getAttribute("data-index") === players[1].position
        ) {
          $(tdTbl[i]).html(`
          <div class="pieces">
            <span class="player-one-piece-high" style="position: 'absolute';">
              <span class="player-one-piece-mid">
                <span class="player-one-piece-low"></span>
              </span>
            </span>
            <span class="player-two-piece-high" style="position: 'absolute';">
              <span class="player-two-piece-mid">
                <span class="player-two-piece-low"></span>
              </span>
            </span>
          </div>`);
          $(".player-one-piece-high").css("position", "absolute");
          $(".player-two-piece-high").css("position", "absolute");
        }
      } else {
        if (+tdTbl[i].getAttribute("data-index") === player.position) {
          $(tdTbl[i]).html(playerTwoPiece);
        }
        if (+tdTbl[i].getAttribute("data-index") === player.pre_position) {
          $(tdTbl[i]).html("");
        }
        if (
          players[1].pre_position === players[0].position &&
          +tdTbl[i].getAttribute("data-index") === players[0].position
        ) {
          $(tdTbl[i]).html(playerOnePiece);
        }
        if (
          players[0].position === players[1].position &&
          +tdTbl[i].getAttribute("data-index") === players[0].position &&
          +tdTbl[i].getAttribute("data-index") === players[1].position
        ) {
          $(tdTbl[i]).html(`
          <div class="pieces">
            <span class="player-one-piece-high" style="position: absolute;">
              <span class="player-one-piece-mid">
                <span class="player-one-piece-low"></span>
              </span>
            </span>
            <span class="player-two-piece-high" style="position: absolute;">
              <span class="player-two-piece-mid">
                <span class="player-two-piece-low"></span>
              </span>
            </span>
          </div>`);
          $(".player-one-piece-high").css("position", "absolute");
          $(".player-two-piece-high").css("position", "absolute");
        }
      }
    }
  };

  // dice handler
  $(".dice").attr("dice-content", "Roll the Dice");
  $(".dice").click(() => {
    if (hasWon) return;

    const alertModal = $(".alert-modal").css("visibility");
    const promptModal = $(".prompt-modal").css("visibility");

    if (alertModal === "visible" || promptModal === "visible") return;

    let currentPlayer = players[playerTurn];

    let rollDice = Math.floor(Math.random() * 6) + 1;

    if (currentPlayer.position + rollDice > 100) return;

    if (players[0].name === "" || players[1].name === "") {
      $(".prompt-modal").css("visibility", "hidden");

      players[0].name = "Player 1";
      players[1].name = "Player 2";

      $(".player-name").html(players[0].name);
      $(".player-dote").css("display", "block");
    }

    $(".dice").attr("dice-content", rollDice);
    $(".dice").css("font-size", "1.25rem");

    currentPlayer.pre_position = currentPlayer.position;
    currentPlayer.position += rollDice;

    $(".game-box").boardGame(currentPlayer);

    ladders.map((item) => {
      if (item.start === currentPlayer.position) {
        currentPlayer.pre_position = item.start;
        currentPlayer.position = item.end;

        $(".game-box").boardGame(currentPlayer);

        $(".alert-modal").css("visibility", "visible");
        $(".alert-message").html("Oh man, you climbed the ladder.");
        setTimeout(() => {
          $(".alert-modal").css("visibility", "hidden");
        }, 1500);
      }
    });

    snakes.map((item) => {
      if (item.start === currentPlayer.position) {
        currentPlayer.pre_position = item.start;
        currentPlayer.position = item.end;

        $(".game-box").boardGame(currentPlayer);

        $(".alert-modal").css("visibility", "visible");
        $(".alert-message").html("Wow, the snake bit you.");
        setTimeout(() => {
          $(".alert-modal").css("visibility", "hidden");
        }, 1500);
      }
    });

    if (currentPlayer.position === 100) {
      $(".alert-modal").css("visibility", "visible");
      $(".alert-message").html(`${currentPlayer.name} has won.`);
      hasWon = true;
      setTimeout(() => {
        location.reload();
      }, 2000);
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
  });
});
