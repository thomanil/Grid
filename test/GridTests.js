TestCase("Grid Tests", {
	
    testProjectNamespace:function(){
	   assertTrue("Checking that project namespace exists", Grid !== undefined);
    },

	testCreate : function() {
		var expected = Grid.wrap([[undefined,undefined],
					     		 [undefined,undefined]]);
		var actual = Grid.newInstance(2,2);
		assertTrue(actual.equals(expected));
	},

	testCompareEqualGrids : function() {
		var equal1 = Grid.wrap([[undefined,undefined],
					  			[undefined,undefined]]);
		var equal2 = Grid.wrap([[undefined,undefined],
					  [undefined,undefined]]);
		assertTrue(equal1.equals(equal2));
	},
	
	testCompareDifferentSizedGrids : function() {
		var small = Grid.wrap([[undefined,undefined],
					  			[undefined,undefined]]);	
		var large = Grid.wrap([[undefined,undefined,undefined],
					  			[undefined,undefined,undefined],
					  			[undefined,undefined,undefined]]);
		assertFalse(small.equals(large));
	},
	
	testCompareGridsWithDifferentContents : function() {
		var none = Grid.wrap([[undefined,undefined],
				  	 			[undefined,undefined]]);	
		var some = Grid.wrap([[2,undefined],
								[undefined,2]]);
		assertFalse(none.equals(some));
	},

	testEach : function() {
		var grid = Grid.wrap([[1,2],
					 		 [3,4]]);
		
		var expectedSum = 10;
		var actualSum = 0;
		
		grid.each(function(cell) {
			actualSum += cell;
		});
		
		assertEquals(expectedSum, actualSum);		
	},
	
	testMap : function() {	
		var grid = Grid.wrap([[1,5],
					 		  [10,100]]);
		var expected = Grid.wrap([[2,6],
					 			 [11,101]]);	
					
		var actual = grid.map(function(cell) {
			return cell + 1;
		});
		
		assertTrue(actual.equals(expected));		
	},
	
	testGet : function() {
		var grid = Grid.wrap([[1,5],
					 		[10,100]]);
					
		assertEquals(grid.get(0, 0), 1);
		assertEquals(grid.get(1, 0), 5);		
		assertEquals(grid.get(0, 1), 10);		
		assertEquals(grid.get(1, 1), 100);
		
		assertEquals(grid.get(-1, 0), undefined);
		assertEquals(grid.get(0, -1), undefined);
		assertEquals(grid.get(2, 0), undefined);
		assertEquals(grid.get(0, 2), undefined);
	},
	
	testSet : function() {
		var grid = Grid.newInstance(2,2);
		
		grid.set(0, 0, 123);
		assertEquals(grid.get(0, 0), 123);
		
		grid.set(1, 1, 234);
		assertEquals(grid.get(1, 1), 234);
		
		var threwException = true;
		try	{
			grid.set(-1, 1, "outside");
			threwException = false;
		} catch (e) {
			// Expecting to fail when we go outside Grid bounds
		}
		if (!threwException) {
			fail("Should have triggered exception by indexing outside of Grid"); 
		};
		
		var threwException = true;
		try	{
			grid.set(2, 1, "outside");
			threwException = false;
		} catch (e) {
			// Expecting to fail when we go outside Grid bounds
		}
		if (!threwException) {
			fail("Should have triggered exception by indexing outside of Grid"); 
		};
	
	},
	
	testWidth : function() {
		
	},
	
	testHeight : function() {
		
	},
	
	testEachRow : function() {
		
	},

	testWrapNo__proto__: function () {
		var twoDimArray = [[undefined,undefined], [undefined,undefined]];
		twoDimArray.__proto__ = null;
		var expected = Grid.wrap(twoDimArray);
		var actual = Grid.newInstance(2,2);

		assertTrue(actual.equals(expected));
	}

});