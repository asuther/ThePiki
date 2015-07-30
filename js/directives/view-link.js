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

                scope.startDrawing(currentX, currentY);
            })
            .bind('mouseup', function(e) {
                mouseDown = false;

                var parent_offset = $(element).parents('table.piki').offset();
                var currentX = (e.pageX - parent_offset.left);
                var currentY = (e.pageY - parent_offset.top)

                //console.log('(' + currentX + ', ' + currentY + ")");

                scope.endDrawing(currentX, currentY);
            })
            .bind('mousemove', function(e) {
                if(mouseDown) {

                    var parent_offset = $(element).parents('table.piki').offset();
                    var currentX = (e.pageX - parent_offset.left);
                    var currentY = (e.pageY - parent_offset.top)

                    //console.log('(' + currentX + ', ' + currentY + ")");

                    scope.updateDrawing(currentX, currentY)
                }

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

        var el = angular.element(element.html()),

        compiled = $compile(el);

        $.fancybox.open(el);

        compiled($scope);

      };
    }
  };
});
