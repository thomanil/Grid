var Grid = {};

// TODO create Grid prototype with all methods on it
// TODO create init/wrapper function a la underscore.js

Grid.areEqual = function(grid1, grid2) {	
	if (Grid.height(grid1) !== Grid.height(grid2)) {
		return false;
	};
	
	if (Grid.width(grid1) !== Grid.width(grid2)) {
		return false;
	};
	
	var areEqual = true;
	Grid.eachCell(grid1, function(cell, x, y) {
		if (cell !== grid2[y][x]) {
		  areEqual = false;
		};
	});
	return areEqual;
};


Grid.create = function(width, height) {
	var grid = [];
	var emptyRow = [];
	
	_.times(height, function(i) {
		var row = [];
		_.times(width, function(j) {
			row.push(undefined);
		})
		grid.push(row);
	})
	
	return grid;
};

Grid.eachCell = function(grid, operation) {
	_(grid).each(function(row, y) {
		_(row).each(function(cell, x){
			operation(cell, x, y);
		});
	});	
};

Grid.eachRow = function(grid, operation) {
	_(grid).each(function(row) {
		operation(row);
	});
};

Grid.mapCells = function(grid, operation) {
	var mappedArray = this.create(grid[0].length, grid.length);	
		
	this.eachCell(grid, function(cell, x, y) {
		var mappedValue = operation(cell, x, y);
		Grid.set(mappedArray, x, y, mappedValue);
	});
	
	return mappedArray;
};

Grid.get = function(grid, x, y) {
	if (x < 0 || x > (Grid.width(grid) - 1)) {
		return undefined;
	};
	
	if (y < 0 || y > (Grid.height(grid) - 1)) {
		return undefined;
	};
	
	return grid[y][x];
};

Grid.set = function(grid, x, y, value) {
	if (x < 0 || x > (Grid.width(grid) - 1)) {
	 	throw "Trying to index x pos outside of Grid bounds";
	};
	
	if (y < 0 || y > (Grid.height(grid) - 1)) {
		throw "Trying to index y pos outside of Grid bounds";
	};
	
	grid[y][x] = value;
};

Grid.width = function(grid) {
	return grid[0].length;
};

Grid.height = function(grid) {
	return grid.length;
};



