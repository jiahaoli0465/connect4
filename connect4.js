



// window.onload = function() {
//   let p1 = "pink"
//   let p2 = "orange"
//   let game = new Game(p1, p2);
//   document.getElementById("widgetRestartGame").addEventListener("click", () => game.playAgain());
//   document.getElementById("widgetResetGame").addEventListener("click", () => game.resetPlayers());


//   // makeBoard();
//   // makeDropper();
// }










// class Player {
//   constructor(name, color) {
//     this.name = name;
//     this.color = color;
//   }
// }






class Game {
  height = 6;
  width = 7;
  board = [];
  dropper = [];
  currentCol = [];
  gameOver = false;

  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;

    this.currPlayer = player1;
    this.makeBoard();
    this.makeDropper();
    
    // this.gameOver = false;

  }
  makeBoard(){
    this.board = [];
    this.currentCol = [5,5,5,5,5,5,5];



    for (let r = 0; r< 6; r++) {
      let row = [];
      for (let c = 0; c < 7; c++) {
        //js
        row.push(' ');
  
      //html
        let tile = document.createElement("div");
        tile.id = r.toString() + "-" + c.toString();
        tile.classList.add("tile");

        
        document.getElementById("board").append(tile);
  
  
      }
      this.board.push(row);
    }
  }
  makeDropper(){
    this.dropper = [];
    for (let d = 0; d< 7; d++){
      this.dropper.push(' ');
      let drops = document.createElement("div");
      drops.id = d.toString();
      drops.classList.add("drops");
      
      
      drops.addEventListener("click", () => this.setPiece(d));
      document.getElementById("dropper").append(drops);
    }

  }

  setPiece(d) {
    if (this.gameOver) {
        return;
    }

    let r = this.currentCol[d];
    if (r < 0) {
        return;
    }
    
    let tile = document.getElementById(r.toString() + "-" + d.toString());
    if (this.currPlayer == this.player1) {
        tile.classList.add("onePiece");
        tile.style.backgroundColor = this.player1;
        tile.classList.add('fall');
        




        this.board[r][d] = this.player1;
    } else {
        tile.classList.add("twoPiece");
        tile.style.backgroundColor = this.player2;
        tile.classList.add('fall');





        this.board[r][d] = this.player2;
    }

    

    if (this.checkWinner()) { // If there's a winner, set gameOver to true and return
        this.gameOver = true;
        
        return;
    }

    // If there's no winner, switch to the next player
    if (this.currPlayer == this.player1) {
        this.currPlayer = this.player2;
    } else {
        this.currPlayer = this.player1;
    }
    document.documentElement.style.setProperty('--current-player-color', this.currPlayer);


    r -= 1;
    this.currentCol[d] = r;
}


  checkWinner() {
    const _win = (cells) => {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer
        return cells.every(
            ([y, x]) =>
                y >= 0 &&
                y < this.height &&
                x >= 0 &&
                x < this.width &&
                this.board[y][x] === this.currPlayer
        );
    }

    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            // get "check list" of 4 cells (starting here) for each of the different
            // ways to win
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

            // find winner (only checking each win-possibility as needed)
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
              this.gameOver = true; // mark game as over
              document.getElementById("widgetMessage").innerText = `${this.currPlayer} won!`;
              document.getElementById("gameCompleteWidget").style.display = "block";
              return true;
          }
          
        }
    }
    return false; // no winner found
}
playAgain() {
  this.board = [];
  this.dropper = [];
  this.currentCol = [];
  this.clearBoard();
  this.clearDropper();
  this.makeBoard(); // Reset the board
  this.makeDropper(); // Reset the dropper
  this.currPlayer = this.player1; // Set the starting player
  this.gameOver = false; // Set the game over flag to false
  document.getElementById("gameCompleteWidget").style.display = "none"; // Hide the widget
}

resetPlayers() {
  // You can reset player names, colors, etc. here.
  // For this example, I'm just calling playAgain().
  this.playAgain();
}
clearBoard() {
  document.getElementById("board").innerHTML = '';
}

clearDropper() {
  document.getElementById("dropper").innerHTML = '';
}




  
}



//   makeBoard(){
//     for (let r = 0; r< this.width; r++) {
//       let row = [];
//       for (let c = 0; c < this.height; c++) {
//         //js
//         row.push(' ');

//       //html
//       let tile = document.createElement("div");
//       tile.id = r.toString() + "-" + c.toString();
//       tile.classList.add("tile");
//       document.getElementById("board").append(tile);


//       }
//       this.board.push(row);
//     }
  
//   }

//}


// const game = new Game('player1', 'player2');







const formElement = document.querySelector("form");
const playerName1 = document.querySelector("#playerName1");
const playerName2 = document.querySelector("#playerName2");
const color1 = document.querySelector("#p1color");
const color2 = document.querySelector("#p2color");
let p1color;
let p2color;
// let game = new Game(null, null);
formElement.addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("board").innerHTML = '';
  document.getElementById("dropper").innerHTML = '';

  p1color = color1.value.trim();
  p2color = color2.value.trim();
  if (!isValidColor(p1color)) {
    p1color = 'red';  // default color for player 1
  }
  if (!isValidColor(p2color)) {
    p2color = 'blue'; // default color for player 2
  }
  
  let game = new Game(p1color, p2color);
  // game.player1 = p1color;
  // game.player2 = p2color;
  document.documentElement.style.setProperty('--current-player-color', p1color);

  document.getElementById("widgetRestartGame").addEventListener("click", () => game.playAgain());
  document.getElementById("widgetResetGame").addEventListener("click", () => game.resetPlayers());


});


window.addEventListener('DOMContentLoaded', (event) => {
  const p1Tile = document.querySelector('#p1tile');
  p1Tile.style.backgroundColor = 'red';

  const p2Tile = document.querySelector('#p2tile');
  p2Tile.style.backgroundColor = 'blue';

  document.documentElement.style.setProperty('--current-player-color', p1color);

});



//=============
// const input1 = document.querySelector('#p1color');
// const input2 = document.querySelector('#p2color');

const commonColors = [
  'AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 
  'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 
  'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 
  'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 
  'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 
  'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 
  'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 
  'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 
  'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 
  'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 
  'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 
  'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 
  'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 
  'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 
  'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 
  'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 
  'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 
  'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 
  'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 
  'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 
  'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 
  'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'
];

// input1.addEventListener('keyup', searchHandler(input1));
// input2.addEventListener('keyup', searchHandler(input2));


// function searchHandler(input) {
// 	let tempResults = search(input.value);  // Pass the value of the input

//     showSuggestions(tempResults, input.value);

//     // TODO: Logic to handle user input and display matching suggestions.


// }

// function search(str) {
   

// 	let results = colors.filter((item)=> item.toLowerCase().includes(str.toLowerCase()));
//     // TODO: Logic for filtering the fruit list based on the search term.

//     return results;
// }

// function showSuggestions(results, inputVal) {
//   // suggestions.innerHTML = ''; // Clear previous suggestions
//   if (results.length === 0 || inputVal.length === 0) {
//       return; // No suggestions to show
//   }

//   results.sort((a, b) => {
//       const indexA = a.toLowerCase().indexOf(inputVal.toLowerCase());
//       const indexB = b.toLowerCase().indexOf(inputVal.toLowerCase());
//       return indexA - indexB;
//   });

  

// }


// //===================

// // const p1Tile = document.querySelector('#p1tile');
// //   p1Tile.style.backgroundColor = 'red';

// //   const p2Tile = document.querySelector('#p2tile');
// //   p2Tile.style.backgroundColor = 'blue';

// //   // Check if entered colors are valid
 

// //   const p1name = playerName1.value.trim();
// //   const p2name = playerName2.value.trim();

// //   if (p1name && p2name) {
// //     const player1 = new Player(p1name, p1color);
// //     const player2 = new Player(p2name, p2color);
// //     const game = new Game(player1, player2);

// //     console.log("hello world");





    

// //     // Hide initial screen and show game screen
// //     // document.getElementById('initialScreen').style.display = 'none';
// //     // document.getElementById('gameScreen').style.display = 'flex';

// //   } else {
// //     alert("Please fill in the player names before starting the game!");
// //   }
// //   // Game code














// // });
function isValidColor(strColor) {
  var s = new Option().style;
  s.color = strColor;
  return s.color !== '' || commonColors.includes(strColor);
}


color1.addEventListener('input', function() {
  const currentColor = isValidColor(color1.value.trim()) ? color1.value.trim() : null;
  if (currentColor) {
      document.querySelector('#p1tile').style.backgroundColor = currentColor;
  }
  else {
    document.querySelector('#p1tile').style.backgroundColor = 'red';

  }
});

color2.addEventListener('input', function() {
  const currentColor = isValidColor(color2.value.trim()) ? color2.value.trim() : null;
  if (currentColor) {
      document.querySelector('#p2tile').style.backgroundColor = currentColor;
  }
  else {
    document.querySelector('#p2tile').style.backgroundColor = 'blue';

  }
});
