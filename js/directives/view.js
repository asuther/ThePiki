//Piki Shapes
pikiApp.directive('pikiShape', function($parse) {
	return {
		link: function(scope, element, attributes) {

			//Initialize Shapes
			element.bind('mouseenter', function() {
				var child_id = parseInt(attributes['pikiId']);
				var tab_id = scope.model.tabId;

				//Show information about that piki region
				scope.pikiChildren[tab_id][child_id].show(element[0].offsetLeft,element[0].offsetTop);
				console.log("Mouse Entered to Piki ID="+child_id+ "  Region name: "+scope.pikiChildren[tab_id][child_id].name);
			})
			.bind('mouseleave', function() {
				var child_id = parseInt(attributes['pikiId']);
				var tab_id = scope.model.tabId;

				//Hide the tooltip
				scope.pikiChildren[tab_id][child_id].hide();
				// console.log("Mouse Exited PikiID area: "+piki_id);
			})
			.bind('mousemove', function(e) {
				// console.log($(element).parents('table.piki').offset());
				// console.log('E.PageX: ' + e.pageX)
				var parent_offset = $(element).parents('table.piki').offset();
				var child_id = parseInt(attributes['pikiId']);

				// console.log("Parent Offset(top): "+parent_offset.top+" Parent Offset(left): "+parent_offset.left);
				scope.pikiChildren[scope.model.tabId][child_id].update(e.pageX - parent_offset.left, e.pageY - parent_offset.top);
				// console.log("Mouse Move PikiID area: "+piki_id);
			});
		}
	};
});

pikiApp.directive('loadingImage', function() {
	return  {
		restrict: 'C',
		link: function(scope, element, attributes) {
			element.bind('load', function() {
				element.css('visibility','visible').parent().removeClass('loading');

			});
		}
	};
});

pikiApp.directive('categoryTab', function() {
	return  {
		link: function(scope, element, attributes) {
			element.bind('click', function() {
				var clickedTabID = parseInt(attributes['categoryTab']);
				//Clear the canvas
				scope.loadNewTab(clickedTabID);
				scope.$apply();
			});
		}
	};
});
