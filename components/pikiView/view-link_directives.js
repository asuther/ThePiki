//Drawable Shape
pikiApp.directive('drawable', function($parse) {
    var mouseDown = false;
    return {
        restrict: 'C',
        link: function(scope, element, attributes) {

            //Initialize Shapes
            element.bind('mousedown', function(e) {
                var parent_offset = $(element).parents('table.piki').offset();
                var currentX = (e.pageX - parent_offset.left);
                var currentY = (e.pageY - parent_offset.top)

                mouseDown = true;

                scope.drawingTools.mouseDown(currentX, currentY);
            })
            .bind('mouseup', function(e) {
                mouseDown = false;

                var parent_offset = $(element).parents('table.piki').offset();
                var currentX = (e.pageX - parent_offset.left);
                var currentY = (e.pageY - parent_offset.top)

                //console.log('(' + currentX + ', ' + currentY + ")");

                scope.drawingTools.mouseUp(currentX, currentY);
            })
            .bind('mousemove', function(e) {

                var parent_offset = $(element).parents('table.piki').offset();
                var currentX = (e.pageX - parent_offset.left);
                var currentY = (e.pageY - parent_offset.top)

                //console.log('(' + currentX + ', ' + currentY + ")");

                scope.drawingTools.mouseMove(currentX, currentY, mouseDown)

            });
        }
    };
});

pikiApp.directive('fancybox', function($compile) {
    return {
        restrict: 'A',
        replace: false,
        link: function($scope, element, attrs) {

            $scope.open_fancybox = function() {

                //Get new xyArray
                $scope.updateXYArray();
                console.log($scope.xyArray);

                var el = angular.element(element.html()),

                compiled = $compile(el);

                $.fancybox.open(el);

                compiled($scope);

            };
        }
    };
});
