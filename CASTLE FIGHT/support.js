var support_number = 100;
var support_count = 0;
var support_energy = new Object();
var support_total_energy = 100;
var support_energy_increase_speed = 100;

function call_support(){
	if(support_count < support_number){
		var new_arrow = new Object();
		new_arrow.init = arrow_init;
		new_arrow.init("arrow_image", arrow_width, arrow_height, arrow_speed, arrow_power * 2,
						 Math.random() * 2000 + my_castle.damage_pos_x, 
						 0, -88, arrow_gradient);
		arrows.push(new_arrow);
		support_count++;
		setTimeout("call_support()", 50);
	}
	else{
		support_count = 0;
	}
	
}