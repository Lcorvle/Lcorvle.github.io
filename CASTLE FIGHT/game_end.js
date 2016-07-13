var game_end_flag = -1;
var game_result = "";

function new_game_button_appear(){
	var count_ngba;
	if(game_end_flag == 0){
		game_result = "You lose";
		for(count_ngba = 0;count_ngba < soldiers.length;count_ngba++){
			if(soldiers[count_ngba].soldier_status == 2){
				soldiers.splice(count_ngba, 1);
				count_ngba--;
				continue;
			}
			if(soldiers[count_ngba].side == 0){
				clearInterval(soldiers[count_ngba].run_animate);
				clearInterval(soldiers[count_ngba].attack_animate);
				soldiers[count_ngba].hp.set_value(0);
				soldiers[count_ngba].die();
				continue;
			}
			clearInterval(soldiers[count_ngba].run_animate);
			clearInterval(soldiers[count_ngba].attack_animate);
			soldiers[count_ngba].soldier_status = 0;
			soldiers[count_ngba].run();
		}
	}
	else if(game_end_flag == 1){
		game_result = "You win";
		for(count_ngba = 0;count_ngba < soldiers.length;count_ngba++){
			if(soldiers[count_ngba].soldier_status == 2){
				soldiers.splice(count_ngba, 1);
				count_ngba--;
				continue;
			}
			if(soldiers[count_ngba].side == 1){
				clearInterval(soldiers[count_ngba].run_animate);
				clearInterval(soldiers[count_ngba].attack_animate);
				soldiers[count_ngba].hp.set_value(0);
				soldiers[count_ngba].die();
				continue;
			}
			clearInterval(soldiers[count_ngba].run_animate);
			clearInterval(soldiers[count_ngba].attack_animate);
			soldiers[count_ngba].soldier_status = 0;
			soldiers[count_ngba].run();
		}
	}
	arrow_on = false;
	var temp_button = document.getElementById("new_game_button");
	var button_appear_animate = setInterval(function(){
		if(parseInt(temp_button.style.top) < window.innerHeight / 2 + 40){
			temp_button.style.top = parseInt(temp_button.style.top) + 10 + 'px';
		}
		else{
			temp_button.style.top = window.innerHeight / 2 + 50 + 'px';
			game_end_flag = 2;
			clearInterval(button_appear_animate);
		}
	},20)
};

function reset_data(){
	my_castle.castle_health = 5000;
	ai_castle.castle_health = 5000;
	my_castle.money.set_current_dollars(1000);
	my_castle.money.stop_increase();
	arrow_on = false;
	arrow_numbers.value_to(arrow_total_number);
	support_energy.value_to(support_total_energy);
	my_castle.arrow_tower.current_degree = 0;
	while(soldiers.length > 0){
		soldiers.splice(0,1);
	}
	while(arrows.length > 0){
		arrows.splice(0,1);
	}
	my_castle.money.start_increase();
	game_end_flag = -1;
};

function draw_game_result(ctx){
	if(game_end_flag != -1){
		var temp_button = document.getElementById("new_game_button");
		ctx.font = "130px GAMETITLE";
		ctx.fillStyle = "green";
		ctx.fillText(game_result, (window.innerWidth - 430) / 2, parseInt(temp_button.style.top) - 70);
	}
};