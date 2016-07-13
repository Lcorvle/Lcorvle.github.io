var damage_array = [10,14,10,14,10];
var health_array = [200,300,200,300,200];
var attack_range_array = [140,0,100,0,120];
var attack_speed_array = [200,200,532,266,133];
var move_speed_array = [20,-20,20,-20,20];
var money_value = [100, 50, 150, 70, 200];
/*xsx*/
var head_x_array = [80,23,70,70,60];
var hp_begin_array = [40,20,36,30,30];
var head_width_array = [56,50,53,51,56];
var height_array = [140,160,155,170,180];
/*---*/

var die_delta = [{
	delta_x_0: -120,
	delta_y_0: 0,
	delta_x_1: -180,
	delta_y_1: +40,
},
{
	delta_x_0: 60,
	delta_y_0: 0,
	delta_x_1: 120,
	delta_y_1: 50,
}
];

var attack2_delta = [
{
	delta_x:0,
	delta_y:15,
}
,
{
	delta_x:-60,
	delta_y:-20,
}
,
{
	delta_x:0,
	delta_y:0,
}
,
{
	delta_x:-90,
	delta_y:0,
}
,
{
	delta_x:0,
	delta_y:0,
}
];

var cd = [3000,6000,19000];



/*----xsx-----*/
var total_id = 2000;
var current_id = 0;
/*------------*/



/*-------------------for image----------------*/
var soldier_image_src = [
{
	run0:'Resource/image/run0_soldier_0.gif', 
	run1:'Resource/image/run1_soldier_0.gif',
	run2:'Resource/image/run2_soldier_0.gif',
	attack0: 'Resource/image/attack0_soldier_0.gif',
	attack1: 'Resource/image/attack1_soldier_0.gif',
	attack2: 'Resource/image/attack2_soldier_0.gif',
},
{
	run0:'Resource/image/run0_soldier_1.gif',
	run1:'Resource/image/run1_soldier_1.gif',
	run2:'Resource/image/run2_soldier_1.gif',
	attack0:'Resource/image/attack0_soldier_1.gif',
	attack1:'Resource/image/attack1_soldier_1.gif',
	attack2:'Resource/image/attack2_soldier_1.gif',
},
{
	run0:'Resource/image/run0_soldier_2.gif',
	run1:'Resource/image/run1_soldier_2.gif',
	run2:'Resource/image/run2_soldier_2.gif',
	attack0:'Resource/image/attack0_soldier_2.gif',
	attack1:'Resource/image/attack1_soldier_2.gif',
	attack2:'Resource/image/attack2_soldier_2.gif',
},
{
	run0:'Resource/image/run0_soldier_3.gif',
	run1:'Resource/image/run1_soldier_3.gif',
	run2:'Resource/image/run2_soldier_3.gif',
	attack0:'Resource/image/attack0_soldier_3.gif',
	attack1:'Resource/image/attack1_soldier_3.gif',
	attack2:'Resource/image/attack2_soldier_3.gif',
},
{
	run0:'Resource/image/run0_soldier_4.gif',
	run1:'Resource/image/run1_soldier_4.gif',
	run2:'Resource/image/run2_soldier_4.gif',
	attack0:'Resource/image/attack0_soldier_4.gif',
	attack1:'Resource/image/attack1_soldier_4.gif',
	attack2:'Resource/image/attack2_soldier_4.gif',
}
];

var soldier_head_src = [
	'Resource/image/soldier0.gif',
	'Resource/image/soldier2.gif',
	'Resource/image/soldier4.gif'
];

var soldier_die_src = [
{
	die0:'Resource/image/die0_white.gif',
	die1:'Resource/image/die1_white.gif',
},
{
	die0:'Resource/image/die0_black.gif',
	die1:'Resource/image/die1_black.gif',
}
];

var soldier_die_image = [];

var soldier_image_array = [];
/*--------------------------------------------*/

var soldiers = [];
var soldier_type = 5;
//to adjust
var soldier_scale = 0.5;

function soldier_init(type_number, side){
	//console.log('soldier_init')

	//0 player 1computer
	this.side = side;
	this.soldier_type = type_number;
	this.move_speed = move_speed_array[type_number] * scale;
	this.health = health_array[type_number];
	this.attack_range = attack_range_array[type_number] * scale;
	this.damage = damage_array[type_number] * rate / attack_speed_array[type_number];
	this.head_x = head_x_array[type_number] * scale;
	this.hp_begin = hp_begin_array[type_number] * scale;
	this.head_width = head_width_array[type_number] * scale;
	this.height = height_array[type_number] * scale;
	this.should_delete = false;

	this.run = soldier_run;
	this.attack = soldier_attack;
	this.die = soldier_die;

	if(type_number % 2 == 0){
		this.pos_x = background_original_width * 0.10 * scale;
	}
	else{ 
		this.pos_x = background_original_width * 0.90 * scale;
	}
	this.pos_y = Math.random() * window.innerHeight*0.10 +  window.innerHeight *0.65;

	this.run_status = 0;

	this.attack_status = 0;

	this.soldier_status = 0;

	this.die_status = 0;


	/*---------------xsx---------------------*/
	this.id = current_id;
	current_id++;
	if(current_id == total_id){
		current_id = 0;
	}
	this.hp = new Object();
	this.hp.init = HP_init;
	this.hp.init("hp_image", "hp_bg_image", 0, 0, 
			0, 0, 0, this.health);
	this.hp.set_round_time(10);
	/*---------------------------------------*/
}

function soldier_run(){
	var real_this = this;
	real_this.soldier_status = 0;
	this.run_animate = setInterval(function(){
		real_this.pos_x += real_this.move_speed;
		real_this.run_status++;
		if(real_this.run_status == 4){
			real_this.run_status = 0;
		}
	}, 80);
}

function soldier_attack(){
	var real_this = this;
	real_this.soldier_status = 1;
	this.attack_animate = setInterval(function(){
		real_this.attack_status++;
		if(real_this.attack_status >= 3){
			real_this.attack_status = 0;
		}
	}, attack_speed_array[real_this.soldier_type]);
}

function soldier_die(){
	var real_this = this;
	real_this.soldier_status = 2;
	real_this.die_animate = setTimeout(function(){
		real_this.die_status = 1;
		var disappear = setTimeout(function(){
			//push out to array
			real_this.should_delete = true;
			
		}, 3000);
	},150);
}

function soldier_available(){
	var sr0 = document.getElementById("soldier0_section");
	var sr2 = document.getElementById("soldier2_section");
	var sr4 = document.getElementById("soldier4_section");
	var my = my_castle.money.current_dollars;
	if(my >= money_value[0] && !sr0.is_cd){
		sr0.style.background = 'blue';
	}
	else{
		sr0.style.background = 'red';
	}
	if(my >= money_value[2] && !sr2.is_cd){
		sr2.style.background = 'blue';
	}
	else{
		sr2.style.background = 'red';
	}
	if(my >= money_value[4] && !sr4.is_cd){
		sr4.style.background = 'blue';
	}
	else{
		sr4.style.background = 'red';
	}
}