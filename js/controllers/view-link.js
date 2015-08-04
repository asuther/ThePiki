pikiApp.factory('circleDrawingTool', [function () {
    var centerX = 0;
    var centerY = 0;
    var radius = 0;
    var isDone = false;

    return {
        mouseDown: function(x, y, xyArray) {
            console.log('Starting circle');
            centerX = x;
            centerY = y;
            radius = 0;
            xyArray = [centerX,centerY,radius]
            isDone = false;

            return xyArray;
        },
        mouseMove: function(x, y, xyArray, isMouseDown) {
            if( isMouseDown ) {
                //update the radius
                radius = Math.floor(Math.sqrt(Math.pow((x - centerX),2) + Math.pow((y - centerY),2)));

                xyArray = [centerX,centerY,radius];
            }
            return xyArray;

        },
        mouseUp: function(x, y) {
            //update the radius
            radius = Math.floor(Math.sqrt(Math.pow((x - centerX),2) + Math.pow((y - centerY),2)));

            xyArray = [centerX,centerY,radius];
            isDone = true;

            return xyArray;
        },
        draw: function(fullXYArray, drawContext) {
            drawContext.clearRect(0, 0, 300, 300);
            drawContext.beginPath();
            drawContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
            drawContext.closePath();
            drawContext.stroke();
        },
        isDone: function() {
            return isDone;
        },
        resetTool: function() {
            centerX = 0;
            centerY = 0;
            radius = 0;
            isDone = false;
        }
    };
}]);

pikiApp.factory('freehandDrawingTool', [function () {

    var isDone = false;

    return {
        mouseDown: function(x, y, xyArray) {
            //Add the first point
            xyArray.push([x,y]);
            console.log('Line Started');
            isDone = false;
            return xyArray;
        },
        mouseMove: function(x, y, xyArray, isMouseDown) {
            if( isMouseDown ) {
                //Add the current point
                xyArray.push([x,y]);
            }

            return xyArray;
        },
        mouseUp: function(x, y, xyArray) {
            //Add the current point
            xyArray.push([x,y]);

            //Add the first point to close the line
            xyArray.push(xyArray[0]);
            isDone = true;

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
        },
        isDone: function() {
            return isDone;
        },
        resetTool: function() {
            isDone = false;
        }
    };
}]);

pikiApp.factory('rectangleDrawingTool', [function () {

    var startX = 0;
    var startY = 0;
    var width = 0;
    var height = 0;
    var isDone = true;

    return {
        mouseDown: function(x, y, xyArray) {

            startX = x;
            startY = y;
            width = height = 1;

            xyArray = [startX, startY, width, height];
            console.log('Rectangle Started');
            isDone = false;
            return xyArray;
        },
        mouseMove: function(x, y, xyArray, isMouseDown) {
            if( isMouseDown ) {
                width = x - startX;
                height = y - startY;
                xyArray = [startX, startY, width, height];
            }

            return xyArray;
        },
        mouseUp: function(x, y, xyArray) {
            width = x - startX;
            height = y - startY;
            xyArray = [startX, startY, width, height];
            isDone = true;
            console.log('Rectangle Finished');

            return xyArray;
        },
        draw: function(xyArray, drawContext) {
            drawContext.strokeRect(xyArray[0], xyArray[1], xyArray[2], xyArray[3]);
        },
        isDone: function() {
            console.log('Rectangle is done = ' + isDone);
            return isDone;
        },
        resetTool: function() {
            startX = 0;
            startY = 0;
            width = 0;
            height = 0;
            isDone = false;
        }
    };
}]);

pikiApp.factory('polygonDrawingTool', [function () {

    var isDone = false;
    var distanceToStart = 999;
    var closenessThreshold = 10;

    return {
        mouseDown: function(x, y, xyArray) {
            xyArray.push([x,y]);

            return xyArray;
        },
        mouseMove: function(x, y, xyArray, isMouseDown) {
            console.log(xyArray);
            if( xyArray.length > 0 ) {
                distanceToStartX = x - xyArray[0][0];
                distanceToStartY = y - xyArray[0][1];

                distanceToStart = Math.sqrt( Math.pow(distanceToStartX, 2) + Math.pow(distanceToStartY, 2) )
            }
            return xyArray;
        },
        mouseUp: function(x, y, xyArray) {
            isDone = false;

            //Add the first point to close the line
            if( distanceToStart < closenessThreshold ) {
                xyArray.push(xyArray[0]);
                isDone = true;
            }

            return xyArray;
        },
        draw: function(xyArray, drawContext, x, y) {
            console.log(xyArray);
            drawContext.clearRect(0, 0, 300, 300);
            xyArray.forEach(function (point, index) {
                //console.log("index:" + index);
                //console.log(point);

                if(index == 0) {
                    drawContext.beginPath();
                    drawContext.moveTo( point[0] , point[1] );
                } else {
                    drawContext.lineTo( point[0] , point[1] );
                }
            });
            if ( distanceToStart < closenessThreshold )
                drawContext.lineTo( xyArray[0][0] , xyArray[0][1] );
            else
                drawContext.lineTo( x , y );
            drawContext.stroke();

            drawContext.closePath();

        },
        isDone: function() {
            return isDone;
        },
        resetTool: function() {
            isDone = false;
            distanceToStart = 999;
            closenessThreshold = 10;
        }
    };
}]);

pikiApp.factory('drawingTools', function (circleDrawingTool, freehandDrawingTool, polygonDrawingTool, rectangleDrawingTool) {

    var currentTool = rectangleDrawingTool;
    var xyArray = [[]];
    var currentShape = 0;
    var drawContext;

    return {
        init: function(canvasContext) {
            drawContext = canvasContext;
        },
        mouseDown : function(x,y) {

            xyArray[currentShape] = currentTool.mouseDown(x, y, xyArray[currentShape]);
            this.updateDrawing(x, y);
        },
        mouseMove : function(x, y, isMouseDown) {
            if(xyArray[currentShape] == undefined)
                xyArray[currentShape] = [];
            xyArray[currentShape] = currentTool.mouseMove(x, y, xyArray[currentShape], isMouseDown);
            this.updateDrawing(x, y);
        },
        mouseUp : function(x,y) {
            xyArray[currentShape] = currentTool.mouseUp(x, y, xyArray[currentShape]);
            this.updateDrawing(x, y);
        },
        changeDrawingTool : function(newToolName) {
            console.log('Changed tool to ' + newToolName);
            currentTool = eval(newToolName);
            //currentToolName = newToolName;
            //currentTool = freehandDrawingTool;
        },
        updateDrawing : function(x, y) {
            //console.log(xyArray);
            drawContext.clearRect(0, 0, 300, 300);
            xyArray.forEach(function(shapeCoordinates) {
                console.log(shapeCoordinates);
                if (shapeCoordinates != undefined)
                    currentTool.draw(shapeCoordinates, drawContext, x, y);
            });
            //Check if the shape is done
            if( currentTool.isDone()  ) {
                currentTool.resetTool();
                console.log('adding new shape');
                currentShape++;
            }

        },
        getXYArray: function() {
            return xyArray;
        }
    };
});

pikiApp.factory('pikiSubmitTools', function ($http) {


    return {
        submitChild: function(parentID, shapeCoordinates) {
            return $http.post('ajax/submitChild.php', {parentID: parentID, shapeCoordinates: shapeCoordinates})
            .then(function(pikiDataResult) {
                return pikiDataResult.data;
            });
        }
    };
});

//Link Controller
pikiApp.controller('LinkCtrl', function($scope, $stateParams, $compile, $q, loadPikiService, drawingTools, pikiSubmitTools) {
    //$scope.xyArray = [[]];
    //$scope.currentShape = 0;
    console.log($stateParams);
    $scope.drawingTools = drawingTools;
    $scope.xyArray = [[]];

    $scope.drawingToolList = [
        'circleDrawingTool',
        'freehandDrawingTool'
    ];

    $scope.drawableCanvas = $('.drawable');
    $scope.drawContext = $scope.drawableCanvas[0].getContext("2d");

    $scope.drawingTools.init($scope.drawContext);
    //$scope.currentTool = freehandDrawingTool;
    //$scope.currentToolName = 'freehandDrawingTool'

    $scope.updateXYArray = function() {
        $scope.xyArray = drawingTools.getXYArray();
    };

    $scope.submitShape = function() {
        pikiSubmitTools.submitChild(parseInt($stateParams['pikiId']), $scope.xyArray).then(function( responseData ) {
            console.log(responseData);
        })
    };

});
