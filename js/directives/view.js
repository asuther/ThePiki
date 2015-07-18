//Piki Shapes
pikiApp.directive('pikiShape', function($parse) {
	return {
		link: function(scope, element, attributes) {
			//Initialize Shapes
			element.bind('mouseenter', function() {
				// console.log($(element).offset());
				var piki_id = $parse(attributes.pikiId)(scope);
				console.log(scope.pikiChildren);

				//Show information about that piki region
				scope.pikiChildren[piki_id].show(element[0].offsetLeft,element[0].offsetTop);
				console.log("Mouse Entered to Piki ID="+piki_id+ "  Region name: "+scope.pikiChildren[piki_id].name);
			})
			.bind('mouseleave', function() {
				var piki_id = $parse(attributes.pikiId)(scope);

				//Hide the tooltip
				scope.pikiChildren[piki_id].hide();
				// console.log("Mouse Exited PikiID area: "+piki_id);
			})
			.bind('mousemove', function(e) {
				// console.log($(element).parents('table.piki').offset());
				// console.log('E.PageX: ' + e.pageX)
				var parent_offset = $(element).parents('table.piki').offset();
				var piki_id = $parse(attributes.pikiId)(scope);
				// console.log("Parent Offset(top): "+parent_offset.top+" Parent Offset(left): "+parent_offset.left);
				scope.pikiChildren[piki_id].update(e.pageX - parent_offset.left, e.pageY - parent_offset.top);
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
				var clickedTabID = attributes['categoryTab'];

				//Change children to the new tab's children

			});
		}
	};
});
