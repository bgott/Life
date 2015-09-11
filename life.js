
var grid = [[ 1, 0, 1 ],
			[ 0, 0, 0 ],
			[ 1, 0, 1 ]];

var temp_grid = [[ 0, 0, 0 ],
				[ 0, 0, 0 ],
				[ 0, 0, 0 ]];

randomizeGrid();
updateUI();
var playLife = setInterval(play, 2000);

function randomizeClick() {
	randomizeGrid();
	updateUI()
	play();
}

function pressPause() {
	window.clearInterval(playLife);
	document.getElementById("playbutton").disabled = false;
	document.getElementById("pausebutton").disabled = true;
}

function pressPlay() {
	play();
	document.getElementById("playbutton").disabled = true;
	document.getElementById("pausebutton").disabled = false;
	playLife = setInterval(play, 2000);
	
}

function isInBounds(x, y) {
	return ( (x >= 0) && (x <= 2) && (y >= 0) && (y <= 2));
}

function updateGrid(i, j, n) {
	switch(n) {
		case 2:
			temp_grid[i][j] = 1;
			break;
		case 3:
			temp_grid[i][j] = grid[i][j];
			break;
		default:
			temp_grid[i][j] = 0;
			break;
	}
}

function countNeighbors(i, j) {
	var count = 0;
	for (var x = -1; x <= 1; x++) {
		for (var y = -1; y <= 1; y++) {
			if (x == 0 && y == 0) continue;
			if (isInBounds((i + y), (x + j))) {
				count += grid[i+y][j+x];
			}
		}
	}
	return count;
}

function updateUI() {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (grid[i][j]) {
				document.getElementById("" + j + i).className = "thumbnail alive";
			} else {
				document.getElementById("" + j + i).className = "thumbnail dead";
			}
		}
	}
}

function randomizeGrid() {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			var on = Math.random() > 0.5;
			if (on)
				grid[i][j] = 1;
			else
				grid[i][j] = 0;
		}
	}
}

function play() {
	console.log('here');
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			var n = countNeighbors(i, j);
			console.log("neighbors for [" + i + "] [ " + j + " ] = " + n);
			updateGrid(i, j, n);
			updateUI();
		}
	}
	console.log(temp_grid);
	grid = temp_grid;
}


