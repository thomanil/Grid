TestCase("Grid Tests", {

	testNonHandledConstructorException: function(){
		var threwConstructorException = true;
		try {
            var grid = new Grid("Expects array of arrays or length/width numbers");
            threwConstructorException = false;
        } catch(ex1) {
            assertEquals("Usage: new Grid(xDim, yDim) OR new Grid(arrayOfArrays)", ex1);
            }
        if (!threwConstructorException) {
            fail("Should have triggered exception giving suggested usage of Grid constructor.");
        }
	},

    testCreate: function() {
        var expected = new Grid([[undefined, undefined],
        						[undefined, undefined]]);
        var actual = new Grid(2, 2);
        assertTrue(actual.equals(expected));
    },

    testCompareEqualGrids: function() {
        var equal1 = new Grid([[undefined, undefined],
        						[undefined, undefined]]);
        var equal2 = new Grid([[undefined, undefined],
        						[undefined, undefined]]);
        assertTrue(equal1.equals(equal2));
    },

    testCompareDifferentSizedGrids: function() {
        var small = new Grid([[undefined, undefined],
        					[undefined, undefined]]);
        var large = new Grid([[undefined, undefined, undefined],
        					[undefined, undefined, undefined],
        					[undefined, undefined, undefined]]);
        assertFalse(small.equals(large));
    },

    testCompareGridsWithDifferentContents: function() {
        var none = new Grid([[undefined, undefined],
        					[undefined, undefined]]);
        var some = new Grid([[2, undefined],
        					[undefined, 2]]);
        assertFalse(none.equals(some));
    },

    testEach: function() {
        var grid = new Grid([[1, 2],
        					[3, 4]]);

        var expectedSum = 10;
        var actualSum = 0;

        grid.each(function(cell) {
            actualSum += cell;
        });

        assertEquals(expectedSum, actualSum);
    },

    testMap: function() {
        var grid = new Grid([[1, 5],
        					[10, 100]]);
        var expected = new Grid([[2, 6],
        						[11, 101]]);

        var actual = grid.map(function(cell) {
            return cell + 1;
        });

        assertTrue(actual.equals(expected));
    },

    testGet: function() {
        var grid = new Grid([[1, 5],
        					[10, 100]]);

        assertEquals(grid.get(0, 0), 1);
        assertEquals(grid.get(1, 0), 5);
        assertEquals(grid.get(0, 1), 10);
        assertEquals(grid.get(1, 1), 100);

        assertEquals(grid.get( - 1, 0), undefined);
        assertEquals(grid.get(0, -1), undefined);
        assertEquals(grid.get(2, 0), undefined);
        assertEquals(grid.get(0, 2), undefined);
    },

    testSet: function() {
        var grid = new Grid(2, 2);

        grid.set(0, 0, 123);
        assertEquals(grid.get(0, 0), 123);

        grid.set(1, 1, 234);
        assertEquals(grid.get(1, 1), 234);

        var threwException1 = true;
        try {
            grid.set( - 1, 1, "outside");
            threwException1 = false;
        } catch(ex1) {
            // Expecting to fail when we go outside Grid bounds
            }
        if (!threwException1) {
            fail("Should have triggered exception by indexing outside of Grid");
        }

        var threwException2 = true;
        try {
            grid.set(2, 1, "outside");
            threwException2 = false;
        } catch(ex2) {
            // Expecting to fail when we go outside Grid bounds
            }
        if (!threwException2) {
            fail("Should have triggered exception by indexing outside of Grid");
        }

    },

    testWidth: function() {
        var grid = new Grid(3, 2);
        assertEquals(3, grid.width());
    },

    testHeight: function() {
        var grid = new Grid(3, 2);
        assertEquals(2, grid.height());
    },

    testEachRow: function() {
        var grid = new Grid([[1, 5],
        					[10, 100]]);
        var sumOfCells = 0;

        grid.eachRow(function(row) {
            _(row).each(function(cell) {
                sumOfCells += cell;
            });
        });

        assertEquals(116, sumOfCells);
    },

	testEachNeighbour: function(attribute){
		var grid = new Grid([[1,10,100], 
							 [5,50,500],
							 [8,80,800]]);
		var expectedSum = 1504; 
		
		var actualSum = 0;
		grid.eachNeighbour(1, 1, function(cell) {
			actualSum += cell;
		});
		
		assertEquals(expectedSum,actualSum);
	},	
	
	testEachNeighbourAtEdge: function(attribute){
		var grid = new Grid([[1,10,100], 
							 [5,50,500],
							 [8,80,800]]);
		var expectedSum = 149; 
		
		var actualSum = 0;
		grid.eachNeighbour(0, 1, function(cell) {
			actualSum += cell;
		});
		
		assertEquals(expectedSum,actualSum);
	},

});