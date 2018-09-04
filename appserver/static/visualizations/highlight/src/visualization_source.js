/*
 * Visualization source
 */
define([
            'jquery',
            'underscore',
            'api/SplunkVisualizationBase',
            'api/SplunkVisualizationUtils',
            'highlight'
            // Add required assets to this list
        ],
        function(
            $,
            _,
            SplunkVisualizationBase,
            vizUtils
        ) {
  
    // Extend from SplunkVisualizationBase
    return SplunkVisualizationBase.extend({
  
        initialize: function() {
            SplunkVisualizationBase.prototype.initialize.apply(this, arguments);
            this.$el = $(this.el);
			//Add a CSS selector class
			//this.$el.addClass('hangout');
             
            // Initialization logic goes here
        },

        // Optionally implement to format data returned from search. 
        // The returned object will be passed to updateView as 'data'
        formatData: function(data) {

            // Format data 
			if(data.rows.length < 1){
					return false;
			}
			
            return data;
        },
  
        // Implement updateView to render a visualization.
        //  'data' will be the data object returned from formatData or from the search
        //  'config' will be the configuration property object
        updateView: function(data, config) {
            
            // Draw something here
		if (!data){
			return;
		}

		if(!data.meta.done) {
			return;
		}
		
		// Clear out the container div.
		this.$el.empty();
		this.$el.html("");
		
		const {Highlight} = require('highlight');
		var oHighlight = new Highlight();
		
		var keyWord1 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'keyWord1'] || ""
		var keyWord2 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'keyWord2'] || ""
		var keyWord3 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'keyWord3'] || ""
		var keyWord4 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'keyWord4'] || ""
		var keyWord5 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'keyWord5'] || ""
		var keyWord6 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'keyWord6'] || ""
		var keyWord7 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'keyWord7'] || ""
		var keyWord8 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'keyWord8'] || ""
		var keyWord9 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'keyWord9'] || ""
		var keyWord10 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'keyWord10'] || ""
		
		var colour1 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'colour1'] || "#ffb3ba"
		var colour2 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'colour2'] || "#FFDFBA"
		var colour3 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'colour3'] || "#FFFFBA"
		var colour4 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'colour4'] || "#BAE1FF"
		var colour5 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'colour5'] || "#BAFFC9"
		var colour6 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'colour6'] || "#ffb3ba"
		var colour7 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'colour7'] || "#FFDFBA"
		var colour8 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'colour8'] || "#FFFFBA"
		var colour9 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'colour9'] || "#BAE1FF"
		var colour10 = config[this.getPropertyNamespaceInfo().propertyNamespace + 'colour10'] || "#BAFFC9"
		var noMatchRows = config[this.getPropertyNamespaceInfo().propertyNamespace + 'noMatchRows'] || 10;
		var exceptions = config[this.getPropertyNamespaceInfo().propertyNamespace + 'exceptions'] || ""
		
		
		oHighlight.addKeyword(keyWord1,colour1);
		oHighlight.addKeyword(keyWord2,colour2);
		oHighlight.addKeyword(keyWord3,colour3);
		oHighlight.addKeyword(keyWord4,colour4);
		oHighlight.addKeyword(keyWord5,colour5);
		oHighlight.addKeyword(keyWord6,colour6);
		oHighlight.addKeyword(keyWord7,colour7);
		oHighlight.addKeyword(keyWord8,colour8);
		oHighlight.addKeyword(keyWord9,colour9);
		oHighlight.addKeyword(keyWord10,colour10);
		

		//Set how many lines to show when there is no match
		oHighlight.setNoMatchRows(noMatchRows);
		// Add the exceptions
		oHighlight.addExceptions(exceptions);
		
		var activeColumns = config[this.getPropertyNamespaceInfo().propertyNamespace + 'activeColumns'] || "_raw"
		var activeColumns = activeColumns.split(',');
		var i = 0;
		for(i=0; i<activeColumns.length;i++)
		{
			oHighlight.addActiveColumn(activeColumns[i]);
		}
		
		let copy_of_data = JSON.parse(JSON.stringify(data));
		oHighlight.addData(copy_of_data);
		
		
		this.$el.html('<div class="highlight_scroll">' + oHighlight.getDIVs() + '</div>');
		
        },

        // Search data params
        getInitialDataParams: function() {
            return ({
                outputMode: SplunkVisualizationBase.ROW_MAJOR_OUTPUT_MODE,
                count: 10000
            });
        },

        // Override to respond to re-sizing events
        reflow: function() {
			console.log("Reflow just ran");
			
		}
    });
});
