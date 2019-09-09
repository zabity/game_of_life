document.addEventListener("DOMContentLoaded", function () {

  function gameOfLife(boardWidth, boardHeight) {
    var self = this;

    this.width = boardWidth;
    this.height = boardHeight;
    this.board = document.getElementById('board');
    this.cells = [];
    this.nextGeneration = [];
    this.cellSize = 10;
    this.speed = 200;

    // add event listeners
    this.setEvents = function () {
      document.getElementById('play').addEventListener('click', this.start);
    }

    // draw grid
    this.createBoard = function () {
      self.board.style.width = self.width * self.cellSize + "px";
      self.board.style.height = self.height * self.cellSize + "px";

      var cellAmount = self.width * self.height;

      for (var i = 0; i < cellAmount; i++) {
        var cell = document.createElement('div');
        cell.addEventListener('mouseover', function () {
          this.classList.toggle("live");
        })
        self.board.appendChild(cell);
        self.cells.push(cell);
      }
    }

    // check any cell's neighbourhood and return number of live ones
    this.checkNeighbours = function (cellIndex) {
      var cells = self.cells;
      var x = cellIndex;
      var up = x - self.width;
      var down = x + self.width;

      var neighbours = {
        one: up - 1,
        two: up,
        three: up + 1,
        four: x - 1,
        five: x + 1,
        six: down - 1,
        seven: down,
        eight: down + 1
      }

      var liveNeighbours = 0;

      for (var prop in neighbours) {
        var index = neighbours[prop];
        var exists = cells.indexOf(cells[index]) !== -1 ? true : false;

        if (exists) {
          // if is on the left
          if (x % self.width === 0) {
            if (prop !== 'one' && prop !== 'four' && prop !== 'six' && cells[index].classList.contains('live')) {
              liveNeighbours++;
            }

          // if is on the right
          } else if ((x + 1) % self.width === 0) {
            if (prop !== 'three' && prop !== 'five' && prop !== 'eight' && cells[index].classList.contains('live')) {
              liveNeighbours++;
            }

          } else if (cells[index].classList.contains('live')) {
            liveNeighbours++;
          }
        }
      }

      return liveNeighbours;
    }

    // return 1 if cell should live and 0 if should die
    this.checkFate = function(cellIndex, liveNeighbours){

      if(self.cells[cellIndex].classList.contains('live')){
        if(liveNeighbours === 2 || liveNeighbours === 3){
          return 1;
        } else {
          return 0;
        }
      } else {
        if(liveNeighbours === 3){
          return 1;
        } else {
          return 0;
        }
      }
    }

    // create an array of fates
    this.CalculateNextGeneration = function(){
      self.nextGeneration = [];
      for(var i = 0; i<self.cells.length; i++){
        var liveNeighbours = self.checkNeighbours(i);
        var fate = self.checkFate(i,liveNeighbours);

        fate === 1 ? self.nextGeneration.push(1) : self.nextGeneration.push(0);
      }

    }

    // change styles of cells accordingly
    this.printNexGeneration = function(){
      self.CalculateNextGeneration();
      for(var i = 0; i<self.cells.length; i++){
        self.nextGeneration[i] ? self.cells[i].className = 'live' : self.cells[i].className = '';
      }
    }

    this.start = function(){
      setInterval(self.printNexGeneration,self.speed);
    }
  }

  var game = new gameOfLife(50, 50);
  game.createBoard();
  game.setEvents();

})