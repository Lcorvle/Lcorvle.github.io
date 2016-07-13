function money_init(begin_dollars, increasing_speed){
	this.current_dollars = begin_dollars;
	this.increasing_speed = increasing_speed;
	this.increasing_switch = true;
	this.start_increase = function(){
		this.increasing_switch = true;
	};
	this.stop_increase = function(){
		this.increasing_switch = false;
	};
	this.set_increase_speed = function(speed){
		this.increasing_speed = speed;
	};
	this.add_dollars_by = function(number){
		this.current_dollars += number;
	};
	this.set_current_dollars = function(number){
		this.current_dollars = number;
	};
	this.update = function(){
		if(this.increasing_switch){
			this.current_dollars = this.current_dollars + this.increasing_speed * rate / 1000;
		}
	};
};

function money_update(){
	money_count = (money_count + 1) % 60;
	my_castle.money.update();
	if(money_count == 0){
		document.getElementById("my_money").innerText = "Money:" + parseInt(my_castle.money.current_dollars);
	}
	soldier_available();
};