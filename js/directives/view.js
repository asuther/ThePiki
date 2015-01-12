//Piki Shapes
myApp.directive('pikiShape', function($parse) {
	return {
		link: function(scope, element, attributes) {
			//Initialize Shapes
			element.bind('mouseenter', function() {
				// console.log($(element).offset());
				var piki_id = $parse(attributes.pikiId)(scope);
				console.log(element[0].offsetTop);
				scope.pikiChildren[piki_id].show(element[0].offsetLeft,element[0].offsetTop);
				console.log("Mouse Entered to PikiID area: "+piki_id);
			})
			.bind('mouseleave', function() {
				var piki_id = $parse(attributes.pikiId)(scope);
				scope.pikiChildren[piki_id].hide();
				// console.log("Mouse Exited PikiID area: "+piki_id);
			})
			.bind('mousemove', function(e) {
				 console.log($(element).parents('table.piki').offset());
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

myApp.directive('loadingImage', function() {
	return  {
		restrict: 'C',
		link: function(scope, element, attributes) {
			element.bind('load', function() {
				element.css('visibility','visible').parent().removeClass('loading');

			});
		}
	};
});
