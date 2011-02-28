/*

Basically, a Grid is just a two dimensional array ie. a JavaScript array with each element 
containing another array, all of which have the same dimension. Start using the API by
either instantiating a new empty Grid or wrapping a regular two dimensional grid.

*/



// D. Crockford idiom for clean object inheritance
if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    };
}

var Grid = Object.create([]);

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

Grid.__proto__.wrap = function(twoDimArray) {
	twoDimArray.__proto__ = Grid.__proto__;
	return twoDimArray;
};

Grid.__proto__.equals = function(otherGrid) {	
	if (this.height() !== otherGrid.height()) {
		return false;
	};
	
	if (this.width() !== otherGrid.width()) {
		return false;
	};
	
	var areEqual = true;
	this.each(function(cell, x, y) {
		if (cell !== otherGrid.get(x, y)) {
		  areEqual = false;
		};
	});
	return areEqual;
};


Grid.__proto__.each = function(operation) {
	_(this).each(function(row, y) {
		_(row).each(function(cell, x){
			operation(cell, x, y);
		});
	});	
};

Grid.__proto__.eachRow = function(operation) {
	_(this).each(function(row) {
		operation(row);
	});
};

Grid.__proto__.map = function(operation) {
	var mappedArray = this.newInstance(this.width(), this.height());	
		
	this.each(function(cell, x, y) {
		var mappedValue = operation(cell, x, y);
		mappedArray.set(x, y, mappedValue);
	});
	
	return mappedArray;
};

Grid.__proto__.get = function(x, y) {
	if (x < 0 || x > (this.width() - 1)) {
		return undefined;
	};
	
	if (y < 0 || y > (this.height() - 1)) {
		return undefined;
	};
	
	return this[y][x];
};

Grid.__proto__.set = function(x, y, value) {
	if (x < 0 || x > (this.width() - 1)) {
	 	throw "Trying to index x pos outside of Grid bounds";
	};
	
	if (y < 0 || y > (this.height() - 1)) {
		throw "Trying to index y pos outside of Grid bounds";
	};
	
	this[y][x] = value;
};

Grid.__proto__.width = function() {
	return this[0].length;
};

Grid.__proto__.height = function() {
	return this.length;
};



