function Piki(data,$compile,$scope) {
//*******************************************
//	Variables
//*******************************************
	var id;
	var name;
	var coordinates;
	var map_area_coordinates;
	var tooltip_offset = {
		x: 20,
		y: 20
	};
	var $tooltip;
//*******************************************
//	Init
//*******************************************
	this.id = data.id;
	this.name = data.name;
	console.log(data);
	this.coordinates = data.coordinates;
	//Convert the coordinates into coordinates readable by the area
	// console.log("New Piki created. \n {\n\tName: "+this.name+ " \n\tRectangle: "+this.coordinates+"\n}");
	// this.coordinates = generateMapAreaCoordinates(this.coordinates);
	$tooltip = $('<div class="tooltip">'+this.name+'</div>');
	for (var shape_index = 0; shape_index < this.coordinates.length; shape_index++) {
		// console.log("Area created");
	};

//*******************************************
//	Methods
//*******************************************
	this.draw = function(context) {
		//Draw shapes
		this.coordinates.forEach(function(shape){
			context.fillRect(shape[0],shape[1],shape[2]-shape[0],shape[3]-shape[1]);
		});
	};
	this.show = function(x, y) {
		 console.log("Showing the '"+this.name+"' Tooltip. ("+x+","+y+")");
		$('#visible_image').after($tooltip.css("left",x+tooltip_offset.x).css("top",y+tooltip_offset.y));
	};
	this.update = function(x,y) {
		 console.log("Moving the '"+this.name+"' Tooltip. ("+x+","+y+")");
		$tooltip.css("left",x).css("top",y);
	}
	this.hide = function() {
		// console.log("Hiding the '"+this.name+"' Tooltip");
		$tooltip.remove();
	};

	function generateMapAreaCoordinates(coords) {
		var total_shapes = coords.length;
		for(var shape_index=0;shape_index<total_shapes;shape_index++) {
			console.log("Changing: " + coords[shape_index]);
			coords[shape_index][2]+=coords[shape_index][0];
			coords[shape_index][3]+=coords[shape_index][1];
			console.log("to " + coords[shape_index]);
		}
		return coords;
	}

}
