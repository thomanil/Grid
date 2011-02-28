// D. Crockford idiom for clean object inheritance
if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    };
}

var Grid = Object.create([]);

// TODO rejigger to use functions on itself instead of supplied grid - more OOP!

Grid.__proto__.newInstance = function(width, height) {
	var grid = Object.create(Grid);
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

Grid.__proto__.equals = function(grid1, grid2) {	
	if (Grid.height(grid1) !== Grid.height(grid2)) {
		return false;
	};
	
	if (Grid.width(grid1) !== Grid.width(grid2)) {
		return false;
	};
	
	var areEqual = true;
	Grid.each(grid1, function(cell, x, y) {
		if (cell !== grid2[y][x]) {
		  areEqual = false;
		};
	});
	return areEqual;
};


Grid.__proto__.each = function(grid, operation) {
	_(grid).each(function(row, y) {
		_(row).each(function(cell, x){
			operation(cell, x, y);
		});
	});	
};

Grid.__proto__.eachRow = function(grid, operation) {
	_(grid).each(function(row) {
		operation(row);
	});
};

Grid.__proto__.map = function(grid, operation) {
	var mappedArray = this.newInstance(grid[0].length, grid.length);	
		
	this.each(grid, function(cell, x, y) {
		var mappedValue = operation(cell, x, y);
		Grid.set(mappedArray, x, y, mappedValue);
	});
	
	return mappedArray;
};

Grid.__proto__.get = function(grid, x, y) {
	if (x < 0 || x > (Grid.width(grid) - 1)) {
		return undefined;
	};
	
	if (y < 0 || y > (Grid.height(grid) - 1)) {
		return undefined;
	};
	
	return grid[y][x];
};

Grid.__proto__.set = function(grid, x, y, value) {
	if (x < 0 || x > (Grid.width(grid) - 1)) {
	 	throw "Trying to index x pos outside of Grid bounds";
	};
	
	if (y < 0 || y > (Grid.height(grid) - 1)) {
		throw "Trying to index y pos outside of Grid bounds";
	};
	
	grid[y][x] = value;
};

Grid.__proto__.width = function(grid) {
	return grid[0].length;
};

Grid.__proto__.height = function(grid) {
	return grid.length;
};



