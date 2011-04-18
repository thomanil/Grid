/*

Basically, a Grid is just a two dimensional array ie. a JavaScript array with each element 
containing another array, all of which have the same dimension. Start using the API by
either instantiating a new empty Grid or wrapping a regular two dimensional array.

*/



// D. Crockford idiom for clean object inheritance
if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    };
}


var Grid = (function() {

    var gridPrototype = Object.create([]);

    gridPrototype.wrap = function(twoDimArray) {
		// TODO handle different sized rows. Truncate or throw exception?
	
       	 var newGrid = gridPrototype.getEmptyGrid(0, 0);
            _(twoDimArray).each(function(row, i) {
                newGrid.push(twoDimArray[i]);
            });
        return newGrid;
    };

    gridPrototype.equals = function(otherGrid) {
        if (this.height() !== otherGrid.height()) {
            return false;
        }

        if (this.width() !== otherGrid.width()) {
            return false;
        }

        var areEqual = true;
        this.each(function(cell, x, y) {
            if (cell !== otherGrid.get(x, y)) {
                areEqual = false;
            }
        });
        return areEqual;
    };

    gridPrototype.each = function(operation) {
        _(this).each(function(row, y) {
            _(row).each(function(cell, x) {
                operation(cell, x, y);
            });
        });
    };

    gridPrototype.map = function(operation) {
        var mappedArray = this.getEmptyGrid(this.width(), this.height());

        this.each(function(cell, x, y) {
            var mappedValue = operation(cell, x, y);
            mappedArray.set(x, y, mappedValue);
        });

        return mappedArray;
    };

    gridPrototype.get = function(x, y) {
        if (x < 0 || x > (this.width() - 1)) {
            return undefined;
        }

        if (y < 0 || y > (this.height() - 1)) {
            return undefined;
        }

        return this[y][x];
    };

    gridPrototype.set = function(x, y, value) {
        if (x < 0 || x > (this.width() - 1)) {
            throw "Trying to index x pos outside of Grid bounds";
        }

        if (y < 0 || y > (this.height() - 1)) {
            throw "Trying to index y pos outside of Grid bounds";
        }

        this[y][x] = value;
    };

    gridPrototype.width = function() {
        return this[0].length;
    };

    gridPrototype.height = function() {
        return this.length;
    };

    gridPrototype.eachRow = function(operation) {
        _(this).each(function(row) {
            operation(row);
        });
    };

 	gridPrototype.getEmptyGrid = function(width, height) {
        var grid = Object.create(gridPrototype);
        var emptyRow = [];

        _(height).times(function(i) {
            var row = [];
            _(width).times(function() {
                row.push(undefined);
            });
            grid.push(row);
        });

        return grid;
    };

	gridPrototype.eachNeighbour = function(x, y, todo){
		var grid = this;
		var doForNeighbour = function(deltaX, deltaY) {
		  var xPos = x + deltaX;
		  var yPos = y + deltaY;
		  var cell = grid.get(xPos, yPos);
		  if(cell){
			todo(cell);
	      }
		};
		
		doForNeighbour(-1,-1);
		doForNeighbour(0,-1);
		doForNeighbour(1,-1);
		doForNeighbour(-1,1);
		doForNeighbour(0,1);
		doForNeighbour(1,1);
		doForNeighbour(-1,0);
		doForNeighbour(1,0);
	};

    return function() { // Constructor	
		var arg1 = arguments[0];
		var arg2 = arguments[1];
	
		if(_.isArray(arg1)){
			return gridPrototype.wrap(arg1);
		} else if(_(arg1).isNumber() && _(arg2).isNumber()){
			return gridPrototype.getEmptyGrid(arg1, arg2);
		} else {
			throw "Usage: new Grid(xDim, yDim) OR new Grid(arrayOfArrays)";
		}
    };

})();






