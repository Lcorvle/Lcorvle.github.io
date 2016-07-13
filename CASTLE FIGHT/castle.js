var my_castle;
var ai_castle;

var arrow_launcher_image;
var arrow_man_image;
var my_castle_hp = new Object();
var ai_castle_hp = new Object();

function arrow_man_spinning(){
	var am_real_this = this;
	am_real_this.is_spinning = true;
	am_real_this.spin_animate = setInterval(function(){

		am_real_this.arrow_man_status++;

		am_real_this.current_degree += am_real_this.spinning_speed * am_real_this.spinning_direction;

		if(am_real_this.current_degree <= am_real_this.min_degree){
			am_real_this.current_degree = am_real_this.min_degree;
		}
		if(am_real_this.current_degree >= am_real_this.max_degree){
			am_real_this.current_degree = am_real_this.max_degree;
		}
		//console.log(am_real_this.current_degree);
		if(am_real_this.arrow_man_status == 4){
			am_real_this.arrow_man_status = 0;
			if(am_real_this.should_stop){
				clearInterval(am_real_this.spin_animate);
				am_real_this.is_spinning = false;
			}
		}
	}, 100);
}
//my_castle.arrow_tower.current_degree
function my_castle_init(){
	this.castle_health = 5000;
	this.destroy = false;

	var new_arrow_tower = new Object();
	new_arrow_tower.init = arrow_tower_init;
	new_arrow_tower.init();
	this.arrow_tower = new_arrow_tower;

	this.damage_pos_x = 420 * scale;
	//console.log(this.damage_pos_x);
	this.money = new Object();
	this.money.init = money_init;
	this.money.init(1000, 5);
}

function ai_castle_init(){
	this.castle_health = 5000;
	this.destroy = false;
	this.damage_pos_x = (background_original_width - 350) * scale;

}

function arrow_tower_init(){
	this.arrow_man_pos_x = 201 * scale;
	this.arrow_man_pos_y = 60 * scale;

	this.arrow_launcher_pos_x = 262 * scale;
	this.arrow_launcher_pos_y = 46 * scale;

	this.max_degree = 70;
	this.min_degree = -30;
	this.current_degree = 0;

	this.spinning_speed = 1.5;
	this.spinning_direction = 0; // -1 to lower 1 to higher

	this.is_spinning = false;
	this.should_stop = false;

	this.spin = arrow_man_spinning;
	this.arrow_man_status = 0;
}