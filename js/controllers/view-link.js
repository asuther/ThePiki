pikiApp.factory('circleDrawingTool', [function () {
    var centerX = 0;
    var centerY = 0;
    var radius = 0;

    return {
        start: function(x, y, xyArray) {
            console.log('Starting circle');
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

pikiApp.factory('rectangleDrawingTool', [function () {

    var startX = 0;
    var startY = 0;
    var width = 0;
    var height = 0;

    return {
        start: function(x, y, xyArray) {

            startX = x;
            startY = y;
            width = height = 1;

            xyArray = [startX, startY, width, height];
            console.log('Rectangle Started');
            return xyArray;
        },
        update: function(x, y, xyArray) {
            width = x - startX;
            height = y - startY;
            xyArray = [startX, startY, width, height];

            return xyArray;
        },
        end: function(x, y, xyArray) {
            width = x - startX;
            height = y - startY;
            xyArray = [startX, startY, width, height];

            return xyArray;
        },
        draw: function(fullXYArray, drawContext) {
            drawContext.clearRect(0, 0, 300, 300);
            fullXYArray.forEach(function (shapeCoordinates) {
                drawContext.strokeRect(shapeCoordinates[0], shapeCoordinates[1], shapeCoordinates[2], shapeCoordinates[3]);
            });
        }
    };
}]);

pikiApp.factory('drawingTools', function (circleDrawingTool, freehandDrawingTool) {

    var currentTool = circleDrawingTool;
    var xyArray = [[]];
    var currentShape = 0;
    var drawContext;

    return {
        init: function(canvasContext) {
            drawContext = canvasContext;
        },
        startDrawing : function(x,y) {
            if(xyArray[currentShape] == undefined)
                xyArray.push([]);
            xyArray[currentShape] = currentTool.start(x, y, xyArray[currentShape]);
        },
        updateDrawing : function(x, y) {
            xyArray[currentShape] = currentTool.update(x, y, xyArray[currentShape]);
            currentTool.draw(xyArray, drawContext);
        },
        endDrawing : function(x,y) {
            xyArray[currentShape] = currentTool.end(x, y, xyArray[currentShape]);

            currentTool.draw(xyArray, drawContext);
            currentShape++;
        },

        changeDrawingTool : function(newToolName) {
            console.log('Changed tool to ' + newToolName);
            currentTool = eval(newToolName);
            //currentToolName = newToolName;
            //currentTool = freehandDrawingTool;
        }
    };
});

//Link Controller
pikiApp.controller('LinkCtrl', function($scope, $stateParams, $compile, $q, loadPikiService, drawingTools) {
    //$scope.xyArray = [[]];
    //$scope.currentShape = 0;
    $scope.drawingTools = drawingTools;

    $scope.drawingToolList = [
        'circleDrawingTool',
        'freehandDrawingTool'
    ];

    $scope.drawableCanvas = $('.drawable');
    $scope.drawContext = $scope.drawableCanvas[0].getContext("2d");

    $scope.drawingTools.init($scope.drawContext);
    //$scope.currentTool = freehandDrawingTool;
    //$scope.currentToolName = 'freehandDrawingTool'

});
