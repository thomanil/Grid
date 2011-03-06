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

        _.times(height,
        function(i) {
            var row = [];
            _.times(width,
            function(j) {
                row.push(undefined);
            });
            grid.push(row);
        });

        return grid;
    };

    return function() { // Constructor	
		if(_.isArray(arguments[0])){
			return gridPrototype.wrap(arguments[0]);
		} else if(typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ){
			return gridPrototype.getEmptyGrid(arguments[0], arguments[1]);
		} else {
			throw "Not supported usage of constructor.Usage: new Grid(xDim, yDim) OR new Grid(arrayOfArrays)";
		}
    };

})();






