/*
向首兴 2016/7/10
*/

var arrow_total_number = 100;
var arrow_using_speed = 300;
var arrow_increase_speed = 1000;
var arrow_speed = 800;
var arrow_power = 20;
var arrow_gradient = 10;
var arrow_scale = 0.8;
var arrow_width = 123;
var arrow_height = 20;
var arrow_on = false;
var arrow_numbers = new Object();

var arrows = [];
var images_arrow = {
	add: function(name, src){
		var new_image_arrow = new Image();
		new_image_arrow.src = src;
		images_arrow[name] = new_image_arrow;
		images_arrow[name + "_loaded"] = false;
		new_image_arrow.onload = function()
		{
			images_arrow[name + "_loaded"] = true;
		};
	}
};
images_arrow.add("arrow_image", "Resource/image/arrow.gif");


function arrow_init(arrow_img_id, width, height, speed, power, start_x, start_y, angle, gravity){
	this.img_id = arrow_img_id;
	this.width = width;
	this.height = height;
	this.power = power;
	this.angle = angle * Math.PI / 180;
	this.current_x = start_x + Math.cos(this.angle) * width / 2;
	this.current_y = start_y + Math.sin(this.angle) * width / 2;
	this.gravity = gravity * rate / 1000;
	this.speed_x = speed * Math.cos(this.angle) * rate / 1000;
	this.speed_y = -this.speed_x * Math.tan(this.angle);
	this.attack_targets = [-1];

	this.get_side = function(){
		if(this.speed_x > 0){
			return 0;
		}
		else{
			return 1;
		}
	};

	this.get_speed_x = function(){
		return this.speed_x;
	};

	this.get_speed_y = function(){
		return this.speed_y;
	};

	this.get_power = function(){
		return this.power;
	};
	this.get_pos_x = function(){
		return this.current_x + Math.cos(this.angle) * width / 2;
	};
	this.get_pos_y = function(){
		return this.current_y + Math.sin(this.angle) * width / 2;
	};
	this.update = function(){
		this.current_x = this.current_x + this.speed_x;
		this.current_y = this.current_y + this.speed_y;
		this.speed_y = this.speed_y +  this.gravity;
		this.angle = Math.atan(-this.speed_y / this.speed_x);
	};
	this.draw_image = function(ctx, bg_x){
		ctx.translate(this.current_x - Math.cos(this.angle) * this.width / 2 - bg_x, this.current_y - Math.sin(this.angle) * this.width / 2);
		ctx.rotate(-this.angle);
		ctx.drawImage(images_arrow[this.img_id], 0, -this.height / 2, this.width, this.height);
		ctx.rotate(this.angle);
		ctx.translate(bg_x + Math.cos(this.angle) * this.width / 2 - this.current_x, Math.sin(this.angle) * this.width / 2 - this.current_y);
	};
};