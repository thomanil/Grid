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

        assertEquals,(undefined, grid.get( - 1, 0));
        assertEquals(undefined, grid.get(0, -1));
        assertEquals(undefined, grid.get(2, 0));
        assertEquals(undefined, grid.get(0, 2));
    },

    testGetWrapped: function() {
        var grid = new Grid([[1, 5],
        		     [10, 100]]);

        assertEquals(grid.get(0, 0), 1);
        assertEquals(grid.get(1, 0), 5);
        assertEquals(grid.get(0, 1), 10);
        assertEquals(grid.get(1, 1), 100);
       

        assertEquals(5, grid.getWrapped( -1, 0));
	assertEquals(5, grid.getWrapped( -3, 0));
	assertEquals(1, grid.getWrapped(2, 0));
	assertEquals(1, grid.getWrapped(4, 0));
	
	assertEquals(10, grid.getWrapped(0, -1));
	assertEquals(10, grid.getWrapped(0, -3));
	assertEquals(1, grid.getWrapped(0, 2));
	assertEquals(1, grid.getWrapped(0, 4));
    },

    testGetWrappedOnLargeGrid: function() {
	var grid = new Grid(120, 80);
        assertEquals(undefined, grid.getWrapped( -1, 80));
    },

    testSet: function() {
        var grid = new Grid(2, 2);
        grid.set(0, 0, 123);
        assertEquals(grid.get(0, 0), 123);
        grid.set(1, 1, 234);
        assertEquals(grid.get(1, 1), 234);
    },
	    
    testSetWrapped: function() {
	var grid = new Grid(2, 2);
        grid.set(0, 0, 123);
        assertEquals(grid.get(0, 0), 123);
        grid.set(1, 1, 234);
        assertEquals(grid.get(1, 1), 234);
	
        grid.setWrapped(-1, 0, 1);	
	assertEquals(1, grid.get(1, 0));
	grid.setWrapped(-3, 0, 2);
	assertEquals(2, grid.get(1, 0));
	grid.setWrapped(2, 0, 3);
	assertEquals(3, grid.get(0, 0));
	grid.setWrapped(4, 0, 4);
	assertEquals(4, grid.get(0, 0));
	
	grid.setWrapped(0, -1, 5);
	assertEquals(5, grid.get(0, 1));
	grid.setWrapped(0, -3, 6);
	assertEquals(6, grid.get(0, 1));
	grid.setWrapped(0, 2, 7);
	assertEquals(7, grid.get(0, 0));
	grid.setWrapped(0, 4, 8);
	assertEquals(8, grid.get(0, 0));
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