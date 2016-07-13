function createCanvas(){
	var newCanvas = document.createElement("canvas");
	newCanvas.setAttribute('id','game_canvas');
	newCanvas.width = window.innerWidth;
	newCanvas.height = window.innerHeight;
	document.body.appendChild(newCanvas);
}

function render(){
	//draw background
	var ctx_render = document.getElementById('game_canvas').getContext("2d");
	var draw_x;
	var draw_y;

	if(background_ready){
		ctx_render.drawImage(background,background.left_bg,0, background.width, background.height);
	}

	//control castle
	draw_x = my_castle.arrow_tower.arrow_man_pos_x + background.left_bg;
	draw_y = my_castle.arrow_tower.arrow_man_pos_y;
	if(!my_castle.arrow_tower.is_spinning){
		ctx_render.drawImage(arrow_man_image.image_spin0, draw_x, draw_y, arrow_man_image.image_spin0.width, arrow_man_image.image_spin0.height);
	}
	else{
		if(my_castle.arrow_tower.arrow_man_status == 0 || my_castle.arrow_tower.arrow_man_status == 3){
			ctx_render.drawImage(arrow_man_image.image_spin0, draw_x, draw_y, arrow_man_image.image_spin0.width, arrow_man_image.image_spin0.height);
		}
		else if(my_castle.arrow_tower.arrow_man_status == 2){
			ctx_render.drawImage(arrow_man_image.image_spin1, draw_x, draw_y, arrow_man_image.image_spin0.width, arrow_man_image.image_spin0.height);
		}
		else{
			ctx_render.drawImage(arrow_man_image.image_spin2, draw_x, draw_y, arrow_man_image.image_spin0.width, arrow_man_image.image_spin0.height);
		}
	}

	draw_x = my_castle.arrow_tower.arrow_launcher_pos_x + background.left_bg;
	draw_y = my_castle.arrow_tower.arrow_launcher_pos_y;
	ctx_render.save();
	ctx_render.translate(draw_x + arrow_launcher_image.image.width / 2, draw_y + arrow_launcher_image.image.height/2);
	ctx_render.rotate(my_castle.arrow_tower.current_degree * Math.PI / 180);
	ctx_render.translate(-(draw_x + arrow_launcher_image.image.width / 2), -(draw_y + arrow_launcher_image.image.height/2));
	ctx_render.drawImage(arrow_launcher_image.image, draw_x, draw_y, arrow_launcher_image.image.width, arrow_launcher_image.image.height);
	ctx_render.restore();

	//controll soldier

	var draw_order = [];
	var i,j;
	for(i = 0; i < soldiers.length; i++){
		draw_order.push(i);
		for(j = draw_order.length - 1; j > 0; j--){
			if(soldiers[draw_order[j]].pos_y < soldiers[i].pos_y){
				break;
			}		
			draw_order[j] = draw_order[j - 1];	
		}
		draw_order[j] = i;
	}

	for(j = 0; j < draw_order.length; j++)
	{
		i = draw_order[j];

		draw_x = soldiers[i].pos_x + background.left_bg;
		draw_y = soldiers[i].pos_y;


		/*-----------------------xsx------------------------*/
		if(soldiers[i].soldier_status == 0){
			soldiers[i].hp.resize(soldiers[i].head_width, soldiers[i].height * 0.05);
			soldiers[i].hp.pos_to(draw_x + soldiers[i].hp_begin - soldiers[i].head_width / 2, 
										draw_y - soldiers[i].height * 0.1);
		}
		else{
			soldiers[i].hp.resize(soldiers[i].head_width, soldiers[i].height * 0.05);
			soldiers[i].hp.pos_to(draw_x + soldiers[i].hp_begin - soldiers[i].head_width / 2, 
										draw_y - soldiers[i].height * 0.1);
		}
		soldiers[i].hp.draw_image(ctx_render);
		soldiers[i].hp.update();
		/*--------------------------------------------------*/


		if(soldiers[i].soldier_status == 0)
		//run animate
		{
			//run0 middle
			if(soldiers[i].run_status == 0 || soldiers[i].run_status == 2)
			{
				//console.log(soldier_image_array[soldiers[i].soldier_type].run0.width);
				//console.log(soldier_image_array[soldiers[i].soldier_type].run0.height);
				ctx_render.drawImage(soldier_image_array[soldiers[i].soldier_type].run0, draw_x, draw_y,
					soldier_image_array[soldiers[i].soldier_type].run0.width * scale * soldier_scale,
					soldier_image_array[soldiers[i].soldier_type].run0.height * scale * soldier_scale);
			}
			//run1 large
			else if(soldiers[i].run_status == 1){
				ctx_render.drawImage(soldier_image_array[soldiers[i].soldier_type].run1, draw_x, draw_y,
					soldier_image_array[soldiers[i].soldier_type].run1.width * scale * soldier_scale,
					soldier_image_array[soldiers[i].soldier_type].run1.height * scale * soldier_scale);
			}
			//run2 small
			else{
				ctx_render.drawImage(soldier_image_array[soldiers[i].soldier_type].run2, draw_x, draw_y,
					soldier_image_array[soldiers[i].soldier_type].run2.width * scale * soldier_scale,
					soldier_image_array[soldiers[i].soldier_type].run2.height * scale * soldier_scale);
			}
		}
		else if(soldiers[i].soldier_status == 1){

			//attack0 sta
			if(soldiers[i].attack_status == 0){
				ctx_render.drawImage(soldier_image_array[soldiers[i].soldier_type].attack0, draw_x, draw_y,
					soldier_image_array[soldiers[i].soldier_type].attack0.width * scale * soldier_scale,
					soldier_image_array[soldiers[i].soldier_type].attack0.height * scale * soldier_scale);
			}
			//attack back
			else if(soldiers[i].attack_status == 1){
				ctx_render.drawImage(soldier_image_array[soldiers[i].soldier_type].attack1, draw_x, draw_y,
					soldier_image_array[soldiers[i].soldier_type].attack1.width * scale * soldier_scale,
					soldier_image_array[soldiers[i].soldier_type].attack1.height * scale * soldier_scale);
			}
			//attack front
			else{
				ctx_render.drawImage(soldier_image_array[soldiers[i].soldier_type].attack2, draw_x + attack2_delta[soldiers[i].soldier_type].delta_x * scale, 
					draw_y + attack2_delta[soldiers[i].soldier_type].delta_y * scale * soldier_scale,
					soldier_image_array[soldiers[i].soldier_type].attack2.width * scale * soldier_scale,
					soldier_image_array[soldiers[i].soldier_type].attack2.height * scale * soldier_scale);
			}
		}

		else if(soldiers[i].soldier_status == 2 && !soldiers[i].should_delete){
			if(soldiers[i].die_status == 0){
				ctx_render.drawImage(soldier_die_image[soldiers[i].side].die0, 
					draw_x + die_delta[soldiers[i].side].delta_x_0 * scale,
					draw_y + die_delta[soldiers[i].side].delta_y_0 * scale,
					soldier_die_image[soldiers[i].side].die0.width * scale * soldier_scale,
					soldier_die_image[soldiers[i].side].die0.height * scale * soldier_scale);
			}
			else{
				ctx_render.drawImage(soldier_die_image[soldiers[i].side].die1, 
					draw_x + die_delta[soldiers[i].side].delta_x_1 * scale,
					draw_y + die_delta[soldiers[i].side].delta_y_1 * scale,
					soldier_die_image[soldiers[i].side].die1.width * scale * soldier_scale,
					soldier_die_image[soldiers[i].side].die1.height * scale * soldier_scale);
			}
		}

	}
  	/*--------------------------------xsx------------------------------------------------*/
  	var count_rd;
	for(count_rd = 0;count_rd < arrows.length;count_rd++){
		arrows[count_rd].draw_image(ctx_render, -background.left_bg);
		arrows[count_rd].update();
	}
	/*-------------------xsx--------------------------------------------------------------*/
	ctx_render.drawImage(images_hp.arrow_switch_bg, arrow_numbers.get_pos_x(), arrow_numbers.get_pos_y(),
		arrow_numbers.get_width(), arrow_numbers.get_height());
	arrow_numbers.draw_image(ctx_render);
	arrow_numbers.update();

	ctx_render.drawImage(images_hp.arrow_switch_bg, support_energy.get_pos_x(), support_energy.get_pos_y(),
		support_energy.get_width(), support_energy.get_height());
	support_energy.draw_image(ctx_render);
	support_energy.update();
	attack_decision();


	ctx_render.drawImage(images_hp.castle_health_bg, background.left_bg + 150 * scale, my_castle_hp.get_pos_y(),
		my_castle_hp.get_width(), my_castle_hp.get_height());
	my_castle_hp.pos_to(background.left_bg + 150 * scale, my_castle_hp.get_pos_y());
	my_castle_hp.draw_image(ctx_render);
	my_castle_hp.update();

	ctx_render.drawImage(images_hp.castle_health_bg, background.left_bg + (background_original_width - 50) * scale, 
		ai_castle_hp.get_pos_y(), ai_castle_hp.get_width(), ai_castle_hp.get_height());
	ai_castle_hp.pos_to(background.left_bg + (background_original_width - 50) * scale, ai_castle_hp.get_pos_y());
	ai_castle_hp.draw_image(ctx_render);
	ai_castle_hp.update();
	/*-----------------------------xsx-------------------------------------------------------*/
	draw_game_result(ctx_render);
	/*---------------------------------------------------------------------------------------*/
}
var money_count = 0;
function start_engine(){
	if(has_game_started){
		money_update();
		render();
	}
	// Request to do this again ASAP
	requestAnimationFrame(start_engine);
}
