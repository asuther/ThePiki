//Link Controller
pikiApp.controller('LinkCtrl', function($scope, $stateParams, $compile, $q, loadPikiService) {
    $scope.xyArray = [[]];
    $scope.currentShape = 0;

    $scope.drawableCanvas = $('.drawable');
    $scope.drawContext = $scope.drawableCanvas[0].getContext("2d");


    $scope.startLine = function(x,y) {
        if($scope.xyArray[$scope.currentShape] == undefined)
            $scope.xyArray.push([]);
        $scope.xyArray[$scope.currentShape].push([x,y]);
        console.log('Line Started');
    };
    $scope.addPoint = function(x, y) {
        $scope.xyArray[$scope.currentShape].push([x,y]);

        $scope.drawLine();
    };
    $scope.finishLine = function(x,y) {
        $scope.xyArray[$scope.currentShape].push([x,y]);
        $scope.xyArray[$scope.currentShape].push($scope.xyArray[$scope.currentShape][0]);

        $scope.drawLine();
        $scope.currentShape++;
    };
    $scope.drawLine = function() {
        $scope.drawContext.clearRect(0, 0, 300, 300);
        $scope.xyArray.forEach(function (shapeCoordinates) {
            shapeCoordinates.forEach(function (point, index) {
                //console.log("index:" + index);
                //console.log(point);

                if(index == 0) {
                    $scope.drawContext.beginPath();
                    $scope.drawContext.moveTo( point[0] , point[1] );
                } else {
                    $scope.drawContext.lineTo( point[0] , point[1] );
                }
            });
            $scope.drawContext.stroke();
            $scope.drawContext.closePath();
        });



    };
});
