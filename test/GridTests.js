// YUI Test setup


// Init logger and run tests once the document has finished loading
YAHOO.util.Event.onDOMReady(function () {
	//create the logger
	var logger = new YAHOO.tool.TestLogger("testLogger");
	//run the tests
	YAHOO.tool.TestRunner.run();
});

// Set up tests
YAHOO.tool.TestRunner.add(new YAHOO.tool.TestCase({
	assert : YAHOO.util.Assert,
    name: "Grid Tests",
	
	testCreate : function() {
		var expected =  [[undefined,undefined],
					     [undefined,undefined]];
		var actual = Grid.create(2,2);
		this.assert.isTrue(Grid.areEqual(expected, actual));		
	},

	testCompareEqualGrids : function() {
		var equal1 =  [[undefined,undefined],
					  [undefined,undefined]];
		var equal2 =  [[undefined,undefined],
					  [undefined,undefined]];
		this.assert.isTrue(Grid.areEqual(equal1, equal2));
	},
	
	testCompareDifferentSizedGrids : function() {
		var small =  [[undefined,undefined],
					  [undefined,undefined]];	
		var large =  [[undefined,undefined,undefined],
					  [undefined,undefined,undefined],
					  [undefined,undefined,undefined]];
		this.assert.isFalse(Grid.areEqual(small, large));
	},
	
	testCompareGridsWithDifferentContents : function() {
		var none =  [[undefined,undefined],
				  	 [undefined,undefined]];	
		var some =  [[2,undefined],
					[undefined,2]];
		this.assert.isFalse(Grid.areEqual(none, some));
	},

	testEach : function() {
		var grid =  [[1,2],
					 [3,4]];
		
		var expectedSum = 10;
		var actualSum = 0;
		
		Grid.eachCell(grid, function(cell) {
			actualSum += cell;
		});
		
		this.assert.areEqual(expectedSum, actualSum);		
	},
	
	testMap : function() {	
		var grid =  [[1,5],
					 [10,100]];
		var expected = [[2,6],
					 	[11,101]];	
					
		var actual = Grid.mapCells(grid, function(cell) {
			return cell + 1;
		});
		
		this.assert.isTrue(Grid.areEqual(expected, actual));		
	},
	
	testGet : function() {
		var grid =  [[1,5],
					 [10,100]];
		this.assert.areEqual(Grid.get(grid, 0, 0), 1);
		this.assert.areEqual(Grid.get(grid, 1, 0), 5);		
		this.assert.areEqual(Grid.get(grid, 0, 1), 10);		
		this.assert.areEqual(Grid.get(grid, 1, 1), 100);
		
		this.assert.areEqual(Grid.get(grid, -1, 0), undefined);
		this.assert.areEqual(Grid.get(grid, 0, -1), undefined);
		this.assert.areEqual(Grid.get(grid, 2, 0), undefined);
		this.assert.areEqual(Grid.get(grid, 0, 2), undefined);
	},
	
	testSet : function() {
		var grid = Grid.create(2,2);
		
		Grid.set(grid, 0, 0, 123);
		this.assert.areEqual(Grid.get(grid, 0, 0), 123);
		
		Grid.set(grid, 1, 1, 234);
		this.assert.areEqual(Grid.get(grid, 1, 1), 234);
		
		var threwException = true;
		try	{
			Grid.set(grid, -1, 1, "outside");
			var threwException = false;
		} catch (e) {
			// Expecting to fail when we go outside Grid bounds
		}
		if (!threwException) {
			this.assert.fail("Should have triggered exception by indexing outside of Grid"); 
		};
		
		var threwException = true;
		try	{
			Grid.set(grid, 2, 1, "outside");
			var threwException = false;
		} catch (e) {
			// Expecting to fail when we go outside Grid bounds
		}
		if (!threwException) {
			this.assert.fail("Should have triggered exception by indexing outside of Grid"); 
		};
	
	},
	
	testWidth : function() {
		
	},
	
	testHeight : function() {
		
	},
	
	testEachRow : function() {
		
	}
	
}));