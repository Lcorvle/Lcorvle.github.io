/*
向首兴
*/

var rate = 16.7;


var images_hp = {
	add: function(name, src){
		var newImage_hp = new Image();
		newImage_hp.src = src;
		images_hp[name] = newImage_hp;
		images_hp[name + "_loaded"] = false;
		newImage_hp.onload = function()
		{
			images_hp[name + "_loaded"] = true;
		};
	}
};
images_hp.add("hp_image", "Resource/image/hp.png");
images_hp.add("hp_bg_image", "Resource/image/hp_bg.png");
images_hp.add("arrow_switch_bg", "Resource/image/arrow_switch_bg.png");
images_hp.add("arrow_number", "Resource/image/arrow_number.png");
images_hp.add("arrow_number_bg", "Resource/image/arrow_number_bg.png");
images_hp.add("castle_health_bg", "Resource/image/castle_health_bg.png");
images_hp.add("castle_hp_bg", "Resource/image/castle_hp_bg.png");
images_hp.add("castle_hp", "Resource/image/castle_hp.png");



function HP_init(hp_img_id, hp_bg_img_id, pos_x, pos_y, width, height, style, value){
	this.hp_img_id = hp_img_id;
	this.hp_bg_img_id = hp_bg_img_id;
	this.style = style;//0代表水平血条，1代表竖直血条
	this.pos_x = pos_x;
	this.pos_y = pos_y;
	this.width = width;
	this.height = height;
	this.speed = 0;
	this.bg_speed = 0;
	this.move_round_time = 1000;
	this.total_value = value;
	this.current_value = value;
	this.target_value = value;
	this.current_width = width;
	this.current_height_begin = pos_y;
	this.current_height_end = pos_y + height;
	this.bg_current_value = value;
	this.bg_current_width = width;
	this.bg_current_height_begin = pos_y;
	this.bg_current_height_end = pos_y + height;

	this.get_current_value = function(){
		return this.target_value;
	};

	this.get_total_value = function(){
		return this.total_value;
	};

	this.get_width = function(){
		return this.width;
	};

	this.get_height = function(){
		return this.height;
	};

	this.get_pos_x = function(){
		return this.pos_x;
	};

	this.get_pos_y = function(){
		return this.pos_y;
	};

	this.get_current_pos_y = function(){
		return this.current_height_begin;
	};

	this.get_style = function(){
		return this.style;
	};

	this.get_round_time = function(){
		return this.move_round_time;
	};



	this.set_round_time = function(round_time){
		this.move_round_time = round_time;
	};

	this.update_current_size = function(){
		if(this.style == 0){
			this.current_width = this.width * this.current_value / this.total_value;
			this.current_height_begin = this.pos_y;
			this.current_height_end = this.pos_y + this.height;

			this.bg_current_width = this.width * this.bg_current_value / this.total_value;
			this.bg_current_height_begin = this.pos_y;
			this.bg_current_height_end = this.pos_y + this.height;
		}
		else{
			this.current_height_begin = this.pos_y + this.height * (1 - this.current_value / this.total_value);
			this.current_height_end = this.height + this.pos_y;
			this.current_width = this.width;

			this.bg_current_height_begin = this.pos_y + this.height * (1 - this.bg_current_value / this.total_value);
			this.bg_current_height_end = this.height + this.pos_y;
			this.bg_current_width = this.width;
		}
	};

	this.pos_to = function(pos_x, pos_y){
		this.pos_x = pos_x;
		this.pos_y = pos_y;
		this.update_current_size();
	};

	this.set_style = function(style){
		if(typeof style != "number"){
			console.log("set_style: 参数类型不是数字");
			return;
		}
		if(style != 0 && style != 1){
			console.log("set_style: 参数不是要求的0和1");
			return;
		}
		if(this.style != style){
			this.style = style;
			this.update_current_size();
		}
	};

	this.resize = function(width, height){
		if(typeof width != "number" || typeof height != "number"){
			console.log("set_style: 参数类型不是要求的数字");
			return;
		}
		if(width < 0 || height < 0){
			console.log("set_style: 参数不是要求的正数");
			return;
		}
		this.height = height;
		this.width = width;
		this.update_current_size();
	};

	this.set_total_value = function(value){
		this.current_value = this.current_value * value / this.total_value;
		this.target_value = this.target_value * value / this.total_value;
		this.bg_current_value = this.bg_current_value * value / this.total_value;
		this.speed = this.speed * value / this.total_value;
		this.bg_speed = this.bg_speed * value / this.total_value;
		this.total_value = value;
		this.update_current_size();
	};

	this.set_value = function(value){
		if(value > this.total_value)
		{
			console.log("set_value:设置当前血量不能超过总血量");
			return;
		}
		this.target_value = value;
		this.current_value = value;
		this.bg_current_value = value;
		this.update_current_size();
	};

	this.value_to = function(value){
		this.target_value = value;
		this.speed = (this.target_value - this.current_value) * rate / this.move_round_time;
		this.bg_speed = (this.target_value - this.bg_current_value) * rate / 500;

	};

	this.update = function(){
		if(this.current_value != this.target_value)
		{
			if(Math.abs(this.current_value - this.target_value) > Math.abs(this.speed))
			{
				this.current_value = this.current_value + this.speed;
			}
			else
			{
				this.current_value = this.target_value;
			}
			this.update_current_size();
		}
		if(this.bg_current_value != this.target_value)
		{
			if(Math.abs(this.bg_current_value - this.target_value) > Math.abs(0.9 * this.bg_speed))
			{
				this.bg_current_value = this.bg_current_value + this.bg_speed * 0.9;
			}
			else
			{
				this.bg_current_value = this.current_value;
			}
			this.update_current_size();
		}
		if(this.target_value == 0 && this.current_value == 0){
			return false;
		}
		else{
			return true;
		}
	};

	this.draw_image = function(ctx){
		if(images_hp.hp_bg_image_loaded){
			ctx.drawImage(images_hp[this.hp_bg_img_id], this.pos_x, this.bg_current_height_begin, 
								this.bg_current_width, this.bg_current_height_end - this.bg_current_height_begin);
		}
		if(images_hp.hp_image_loaded){
			ctx.drawImage(images_hp[this.hp_img_id], this.pos_x, this.current_height_begin, 
								this.current_width, this.current_height_end - this.current_height_begin);
		}
	};
};



