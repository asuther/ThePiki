pikiApp.factory('circleDrawingTool', [function () {
    var centerX = 0;
    var centerY = 0;
    var radius = 0;

    return {
        start: function(x, y, xyArray) {
            centerX = x;
            centerY = y;
            radius = 0;
            xyArray = [centerX,centerY,radius]

            return xyArray;
        },
        update: function(x, y, xyArray) {
            //update the radius
            radius = Math.floor(Math.sqrt(Math.pow((x - centerX),2) + Math.pow((y - centerY),2)));

            xyArray = [centerX,centerY,radius];
            return xyArray;

        },
        end: function(x, y) {
            //update the radius
            radius = Math.floor(Math.sqrt(Math.pow((x - centerX),2) + Math.pow((y - centerY),2)));

            xyArray = [centerX,centerY,radius];
            return xyArray;
        },
        draw: function(fullXYArray, drawContext) {
            drawContext.clearRect(0, 0, 300, 300);
            drawContext.beginPath();
            drawContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
            drawContext.closePath();
            drawContext.stroke();
        }
    };
}]);

pikiApp.factory('freehandDrawingTool', [function () {

    return {
        start: function(x, y, xyArray) {
            //Add the first point
            xyArray.push([x,y]);
            console.log('Line Started');
            return xyArray;
        },
        update: function(x, y, xyArray) {
            //Add the current point
            xyArray.push([x,y]);

            return xyArray;
        },
        end: function(x, y, xyArray) {
            //Add the current point
            xyArray.push([x,y]);

            //Add the first point to close the line
            xyArray.push(xyArray[0]);

            return xyArray;
        },
        draw: function(fullXYArray, drawContext) {
            drawContext.clearRect(0, 0, 300, 300);
            fullXYArray.forEach(function (shapeCoordinates) {
                shapeCoordinates.forEach(function (point, index) {
                    //console.log("index:" + index);
                    //console.log(point);

                    if(index == 0) {
                        drawContext.beginPath();
                        drawContext.moveTo( point[0] , point[1] );
                    } else {
                        drawContext.lineTo( point[0] , point[1] );
                    }
                });
                drawContext.stroke();
                drawContext.closePath();
            });
        }
    };
}]);

//Link Controller
pikiApp.controller('LinkCtrl', function($scope, $stateParams, $compile, $q, loadPikiService, circleDrawingTool, freehandDrawingTool) {
    $scope.xyArray = [[]];
    $scope.currentShape = 0;

    $scope.drawableCanvas = $('.drawable');
    $scope.drawContext = $scope.drawableCanvas[0].getContext("2d");

    $scope.currentTool = circleDrawingTool;


    $scope.startDrawing = function(x,y) {
        if($scope.xyArray[$scope.currentShape] == undefined)
            $scope.xyArray.push([]);
        $scope.xyArray[$scope.currentShape] = $scope.currentTool.start(x, y, $scope.xyArray[$scope.currentShape]);
    };
    $scope.updateDrawing = function(x, y) {
        $scope.xyArray[$scope.currentShape] = $scope.currentTool.update(x, y, $scope.xyArray[$scope.currentShape]);
        $scope.currentTool.draw($scope.xyArray, $scope.drawContext);
    };
    $scope.endDrawing = function(x,y) {
        $scope.xyArray[$scope.currentShape] = $scope.currentTool.end(x, y, $scope.xyArray[$scope.currentShape]);

        $scope.currentTool.draw($scope.xyArray, $scope.drawContext);
        $scope.currentShape++;
    };

});
