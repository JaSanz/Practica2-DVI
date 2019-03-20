// Especifica lo que se debe pintar al cargar el juego
var startGame = function() {
  Game.setBoard(0, new Title());
  Game.setBoard(1,new TitleScreen("",
                                  "Press space to start playing",
                                  playGame));
}

var playGame = function() {

  var board = new GameBoard();
  board.add(new Fondo());

  Game.setBoard(0, board);

  //Game.setBoard(2, new Frog());

  var agua = new GameBoard();

  for(i = 0; i < 13; ++i) {
    for(j = 1; j < 6; ++j) {
      agua.add(new Water(i * 40 + 15, j * 48));
    }
  }
  for(z = 0; z < 13; ++z) {
    agua.add(new Home(z*40+15, 0));
  }
  
  agua.add(new Spawner(level1,winGame));

  agua.add(new Frog());

  Game.setBoard(1, agua);
}

var winGame = function() {
  Game.setBoard(1,new TitleScreen("You win!", 
                                  "Press space to play again",
                                  playGame));
};



var loseGame = function() {
  Game.setBoard(1,new TitleScreen("You lose!", 
                                  "Press space to play again",
                                  playGame));
};

// Indica que se llame al método de inicialización una vez
// se haya terminado de cargar la página HTML
// y este después de realizar la inicialización llamará a
// startGame
window.addEventListener("load", function() {
  Game.initialize("game",sprites,startGame);
});
